const config = require('./data/SiteConfig');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl + pathPrefix,
    siteDescription: config.siteDescription,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      author: config.userName,
      copyright: config.copyright
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl + pathPrefix
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- excerpt -->',
        plugins: [
          'gatsby-remark-source-name',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe'
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 800,
              height: 400
            }
          },

          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-emoji'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#c62828'
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage(
              filter: {
                path: {
                  regex: "${regexExcludeRobots}"
                }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: ['*/tags/', '*/categories/'] }]
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/logo.png',

        appName: config.siteTitle,
        appDescription: config.siteDescription,
        developerName: 'Gavin Mogan',
        developerURL: 'https://www.gavinmogan.com',
        dir: 'rtl',
        lang: 'en-US',
        background: '#e0e0e0',
        theme_color: '#c62828',
        display: 'minimal-ui',
        orientation: 'any',
        start_url: config.pathPrefix,
        version: '1.0',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup (ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.image_url = [
            config.siteUrl,
            'img/Gavin-December-1989-a2ce6e58e297f8bdabe2dcbf01e49e3d-0e94d.png'
          ].join('/');
          ret.allContentfulBlogPosts = ref.query.allContentfulBlogPosts;
          ret.generator = 'GatsbyJS Material Starter';
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            title: config.siteTitle,
            serialize (ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allContentfulBlogPosts.edges.map(edge => ({
                categories: edge.node.category.map(c => c.slug),
                date: edge.node.date,
                title: edge.node.title,
                description: edge.node.content.childMarkdownRemark.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.slug,
                guid: rssMetadata.site_url + edge.node.slug,
                custom_elements: [{ 'content:encoded': edge.node.content.childMarkdownRemark.html }]
              }));
            },
            query: `
            {
              allContentfulBlogPosts(
                sort: {fields: date, order: DESC}
                limit: 1000,
              ) {
                edges {
                  node {
                    content {
                      childMarkdownRemark {
                        html
                        excerpt
                      }
                    }
                    slug
                    title
                    date
                    category {
                      slug
                      title
                    }
                    tags
                  }
                }
              }
            }
          `,
            output: config.siteRss
          }
        ]
      }
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN
      }
    }
  ]
};
