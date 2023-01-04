const path = require('path');
const kebabCase = require('lodash.kebabcase');
const {basename} = require('path');
const {urlDatePrefix, getDateFromNode} = require('./src/postUtils.js');

const ucFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getSlugFromNode(node, fileNode) {
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
exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

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
    if (node.frontmatter.attachments && Array.isArray(node.frontmatter.attachments)) {
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

exports.createPages = async ({graphql, actions}) => {
  const {createPage, createRedirect} = actions;

  Object.entries(redirects).forEach(([fromPath, toPath]) =>
    createRedirect({fromPath, toPath, isPermanent: true})
  );

  const indexPage = path.resolve('src/templates/index.jsx');
  const postPage = path.resolve('src/templates/post.jsx');
  //const tagPage = path.resolve('src/templates/tag.jsx');
  //const categoryPage = path.resolve('src/templates/category.jsx');
  const itemPage = path.resolve('src/templates/items.jsx');

  await Promise.all(
    ['presentation', 'project'].map(async sourceName => {
      const result = await graphql(`
        {
          allFile(
            sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
            filter: {sourceInstanceName: {eq: "${sourceName}"}}
          ) {
            edges {
              node {
                childMarkdownRemark {
                  fields {
                    slug
                  }
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
      result.data.allFile.edges.forEach(edge => {
        createPage({
          path: `/${sourceName}s${edge.node.childMarkdownRemark.fields.slug}`,
          component: itemPage,
          context: {
            urlPrefix: `/${sourceName}s/`,
            type: `${ucFirst(sourceName)}s`,
            slug: edge.node.childMarkdownRemark.fields.slug
          }
        });
      });
    })
  );

  await graphql(`{
      allFile(
        sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
        filter: {sourceInstanceName: {eq: "blog"}}
      ) {
      edges {
        node {
          childrenMarkdownRemark {
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
  }`).then(result => {
    if (result.errors) {
      console.log(result.errors);
      throw result.errors;
    }

    const paginationPath = (uri, page, totalPages) => {
      if (page === 0) {
        return uri;
      } else if (page < 0 || page >= totalPages) {
        return '';
      }
      return path.join(uri, (page + 1).toString());
    };

    const blogPosts = result.data.allFile.edges;
    // How many posts per paginated page?
    const blogPostsPerPaginatedPage = 10;
    // How many paginated pages do we need?
    const paginatedPagesCount = Math.ceil(
      blogPosts.length / blogPostsPerPaginatedPage
    );

    // Create each paginated page
    for (let index = 0; index < paginatedPagesCount; index++) {
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
    };
    //const tagSet = new Set();
    //const categorySet = new Set();
    result.data.allFile.edges.forEach(({node: {childrenMarkdownRemark: node}}) => {
      /*
      if (node.fields?.tags) {
        node.fields.tags.forEach(tag => tagSet.add(tag));
      }

      if (node.fields?.category) {
        categorySet.add(node.fields.category);
      }
      */
      createPage({
        path: node.fields.slug,
        component: postPage,
        context: {
          slug: node.fields.slug
        }
      });
    });

    /*
    const tagList = Array.from(tagSet);
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${kebabCase(tag)}/`,
        component: tagPage,
        context: {
          tag,
          slug: `/tags/${kebabCase(tag)}/`
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
    */
  });
};
