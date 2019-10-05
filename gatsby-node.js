const path = require('path');
const _ = require('lodash');
const kebabCase = require('lodash.kebabcase');
const WebpackLodashPlugin = require('lodash-webpack-plugin');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { basename } = require('path');
const { urlDatePrefix, getDateFromNode } = require('./src/postUtils.js');

const ucFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getSlugFromNode (node, fileNode) {
  if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      return `/${kebabCase(node.frontmatter.slug)}`;
    }
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'post_name')) {
      return `/${urlDatePrefix(node, fileNode)}/${node.frontmatter.post_name}`;
    }
  }
  const parsedFilePath = path.parse(fileNode.relativePath);
  if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    return `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    return `/${parsedFilePath.name}/`;
  }
  return `/${parsedFilePath.dir}/`;
}

const fileNodes = {};
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === 'File') {
    fileNodes[node.relativePath] = node.absolutePath;
  }

  if (node.internal.type === 'ContentfulBlogPosts') {
    createNodeField({
      node,
      name: 'url',
      value: `${urlDatePrefix(node)}/${node.slug}`
    });
  }

  if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent);
    if (node.frontmatter.cover) {
      node.frontmatter.cover = fileNode[node.frontmatter.cover] || node.frontmatter.cover;
    }
    if (node.frontmatter.attachments) {
      node.frontmatter.attachments = node.frontmatter.attachments.map(a => {
        return fileNode[basename(a)] || a;
      });
    }
    if (node.frontmatter.links) {
      node.frontmatter.links = node.frontmatter.links.map(a => {
        return {
          ...a,
          url: fileNode[basename(a.url)] || a.url
        };
      });
    }

    createNodeField({
      node,
      name: 'slug',
      value: getSlugFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: 'date',
      value: getDateFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: 'category',
      value: node.frontmatter.category || ''
    });
    createNodeField({
      node,
      name: 'tags',
      value: [].concat(node.frontmatter.tags || [])
    });
    // if (fileNode.sourceInstanceName === 'blog') {
    //  postNodes.push(node);
    // }
  }
};

const redirects = {
  '/volunteering': '/about',
  '/project': '/projects',
  '/project/ur': '/projects/unknown-regions',
  '/project/MTLJPost': '/projects/MTLJPost/',
  '/project/darkwarriors': '/projects/dark-warriors',
  '/project/kodefotobackup': '/projects/kode_foto_backup',
  '/project/drupal modules': '/projects'
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  Object.entries(redirects).forEach(([fromPath, toPath]) =>
    createRedirect({ fromPath, toPath, isPermanent: true })
  );

  const indexPage = path.resolve('src/templates/index.jsx');
  const postPage = path.resolve('src/templates/post.jsx');
  const tagPage = path.resolve('src/templates/tag.jsx');
  const categoryPage = path.resolve('src/templates/category.jsx');
  const itemPage = path.resolve('src/templates/items.jsx');

  await Promise.all(
    ['presentation', 'project'].map(async sourceName => {
      const result = await graphql(`
        {
          allMarkdownRemark(
            sort: { fields: [fields___date], order: DESC }
            filter: { fields: { sourceName: { eq: "${sourceName}" } } }
          ) {
            edges {
              node {
                fields {
                  sourceName
                  slug
                }
              }
            }
          }
        }
      `);
      if (result.errors) {
        console.log(result.errors);
        throw result.errors;
      }
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.fields.sourceName}s${edge.node.fields.slug}`,
          component: itemPage,
          context: {
            urlPrefix: `/${edge.node.fields.sourceName}s/`,
            type: `${ucFirst(edge.node.fields.sourceName)}s`,
            slug: edge.node.fields.slug
          }
        });
      });
    })
  );

  await graphql(`{
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
  }`).then(result => {
    if (result.errors) {
      console.log(result.errors);
      throw result.errors;
    }

    const tagSet = new Set();
    const categorySet = new Set();
    const paginationPath = (uri, page, totalPages) => {
      if (page === 0) {
        return uri;
      } else if (page < 0 || page >= totalPages) {
        return '';
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
        path: paginationPath('/', index, paginatedPagesCount),
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
        edge.node.fields.tags.forEach(tag => tagSet.add(tag));
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
        path: `/categories/${category}/`,
        component: categoryPage,
        context: {
          category,
          slug: `/categories/${category}/`
        }
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [new WebpackLodashPlugin()]
    });
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-decorators',
    options: { legacy: true }
  });
};
