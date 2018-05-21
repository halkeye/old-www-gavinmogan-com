const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const postNodes = [];

function addSiblingNodes(createNodeField) {
  postNodes.sort(
    ({ fields: { date: date1 } }, { fields: { date: date2 } }) =>
      new Date(date1) - new Date(date2)
  );
  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];
    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.frontmatter.title
    });
    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug
    });
    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.frontmatter.title
    });
    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug
    });
  }
}

function urlDatePrefix(node, fileNode) {
  if (fileNode.sourceInstanceName !== "blog") {
    return "";
  }
  if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
    const date = new Date(node.frontmatter.date);
    return `/${[date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(v => _.padStart(v, 2, "0"))
      .join("/")}`;
  }
  return "";
}

function getDateFromNode(node /* , fileNode */) {
  if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
      return node.frontmatter.date;
    }
  }
  return "";
}

function getSlugFromNode(node, fileNode) {
  if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")) {
      return `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, "post_name")) {
      return `${urlDatePrefix(node, fileNode)}/${node.frontmatter.post_name}`;
    }
  }
  const parsedFilePath = path.parse(fileNode.relativePath);
  if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
    return `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === "") {
    return `/${parsedFilePath.name}/`;
  }
  return `/${parsedFilePath.dir}/`;
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);

    createNodeField({
      node,
      name: "slug",
      value: getSlugFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: "date",
      value: getDateFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: "category",
      value: _.get(node, "frontmatter.category") || ""
    });
    createNodeField({
      node,
      name: "tags",
      value: [].concat(_.get(node, "frontmatter.tags") || [])
    });
    if (fileNode.sourceInstanceName === "blog") {
      postNodes.push(node);
    }
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;
  if (name === "MarkdownRemark") {
    addSiblingNodes(createNodeField);
  }
};

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  createRedirect({
    fromPath: "/volunteering",
    toPath: "/about",
    isPermanent: true
  });

  const indexPage = path.resolve("src/templates/index.jsx");
  const postPage = path.resolve("src/templates/post.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const itemPage = path.resolve("src/templates/items.jsx");

  await Promise.all(
    ["presentation", "project"].map(async sourceName =>
      graphql(
        `
        {
          allMarkdownRemark(
            sort: { fields: [fields___date], order: DESC }
            filter: { fields: { sourceName: { eq: "${sourceName}" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                  category
                  tags
                }
                frontmatter {
                  title
                  tags
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          throw result.errors;
        }
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: `/${sourceName}s${edge.node.fields.slug}`,
            component: itemPage,
            context: {
              slug: edge.node.fields.slug
            }
          });
        });
      })
    )
  );

  await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___date], order: DESC }
          filter: { fields: { sourceName: { eq: "blog" } } }
        ) {
          edges {
            node {
              fields {
                slug
                category
                tags
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      throw result.errors;
    }
    if (
      !result.data.allMarkdownRemark ||
      !result.data.allMarkdownRemark.edges
    ) {
      return;
    }

    const tagSet = new Set();
    const categorySet = new Set();
    const paginationPath = (uri, page, totalPages) => {
      if (page === 0) {
        return uri;
      } else if (page < 0 || page >= totalPages) {
        return "";
      }
      return path.join(uri, (page + 1).toString());
    };

    const blogPosts = result.data.allMarkdownRemark.edges;
    // How many posts per paginated page?
    const blogPostsPerPaginatedPage = 10;
    // How many paginated pages do we need?
    const paginatedPagesCount = Math.ceil(
      blogPosts.length / blogPostsPerPaginatedPage
    );

    // Create each paginated page
    _.times(paginatedPagesCount, index => {
      createPage({
        path: paginationPath("/", index, paginatedPagesCount),
        // Set the component as normal
        component: indexPage,
        // Pass the following context to the component
        context: {
          index,
          // Skip this number of posts from the beginning
          skip: index * blogPostsPerPaginatedPage,
          // How many posts to show on this paginated page
          limit: blogPostsPerPaginatedPage,
          // How many paginated pages there are in total
          paginatedPagesCount
        }
      });
    });
    result.data.allMarkdownRemark.edges.forEach(edge => {
      if (edge.node.fields.tags) {
        edge.node.fields.tags.forEach(tag => {
          tagSet.add(tag);
        });
      }

      if (edge.node.fields.category) {
        categorySet.add(edge.node.fields.category);
      }

      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug
        }
      });
    });

    const tagList = Array.from(tagSet);
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagPage,
        context: {
          tag,
          slug: `/tags/${_.kebabCase(tag)}/`
        }
      });
    });

    const categoryList = Array.from(categorySet);
    categoryList.forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: categoryPage,
        context: {
          category,
          slug: `/categories/${_.kebabCase(category)}/`
        }
      });
    });
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
