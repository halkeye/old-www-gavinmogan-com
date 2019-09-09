const path = require('path');
const _ = require('lodash');
const WebpackLodashPlugin = require('lodash-webpack-plugin');

function urlDatePrefix (node) {
  if (node.date) {
    const date = new Date(node.date);
    return `/${[date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(v => _.padStart(v, 2, '0'))
      .join('/')}`;
  }
  return '';
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'ContentfulBlogPosts') {
    createNodeField({
      node,
      name: 'url',
      value: `${urlDatePrefix(node)}/${node.slug}`
    });
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

  await graphql(`
    {
      allContentfulPresentations(sort: {fields: date, order: DESC}) {
        edges {
          node {
            slug
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
    result.data.allContentfulPresentations.edges.forEach(edge => {
      createPage({
        path: `/presentations/${edge.node.slug}`,
        component: itemPage,
        context: {
          urlPrefix: '/presentations/',
          type: 'Presentations',
          slug: edge.node.slug
        }
      });
    });
  });

  await graphql(`
    {
      allContentfulProjects {
        edges {
          node {
            slug
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
    result.data.allContentfulProjects.edges.forEach(edge => {
      createPage({
        type: 'contentfulProjects',
        path: `/projects/${edge.node.slug}`,
        component: itemPage,
        context: {
          urlPrefix: '/projects/',
          type: 'Projects',
          slug: edge.node.slug
        }
      });
    });
  });

  await graphql(`{
    allContentfulBlogPosts(sort: {fields: date, order: DESC}) {
      edges {
        node {
          fields {
            url
          }
          content {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          slug
          tags
          title
          date
          cover {
            fluid {
              src
            }
          }
          category {
            slug
            title
          }
          author {
            slug
            name
          }
          contentful_id
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
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

    const blogPosts = result.data.allContentfulBlogPosts.edges;
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
    result.data.allContentfulBlogPosts.edges.forEach(edge => {
      if (edge.node.tags) {
        edge.node.tags.forEach(tag => tagSet.add(tag));
      }

      if (edge.node.category) {
        edge.node.category.forEach(cat => categorySet.add(cat.slug));
      }

      createPage({
        path: edge.node.fields.url,
        component: postPage,
        context: {
          slug: edge.node.slug
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
