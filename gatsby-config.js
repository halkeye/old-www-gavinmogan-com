const config = require('./data/SiteConfig');
const { toPostInfo } = require('./src/postUtils.js');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    titleTemplate: '%s | The Nameless Site',
    siteUrl: config.siteUrl + pathPrefix,
    siteDescription: config.siteDescription,
    pathPrefix: config.pathPrefix,
    siteLogo: config.siteLogo,
    siteTitleAlt: config.siteTitleAlt,
    userTwitter: config.userTwitter,
    userDescription: config.userDescription,
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
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        enableIdentityWidget: true,
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    'gatsby-plugin-material-ui',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/assets`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'project',
        path: `${__dirname}/content/projects`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'presentation',
        path: `${__dirname}/content/presentations`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/posts`
      }
    },
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
          'gatsby-remark-relative-images',
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
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = 'GatsbyJS Material Starter';
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                siteUrl: site_url
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
              return ctx.query.allMarkdownRemark.edges.map(edge => {
                const postInfo = toPostInfo(edge);
                return {
                  categories: postInfo.categories.map(c => c.slug),
                  date: postInfo.date,
                  title: postInfo.title,
                  description: postInfo.excerpt,
                  author: rssMetadata.author,
                  url: rssMetadata.site_url + postInfo.slug,
                  guid: rssMetadata.site_url + postInfo.slug,
                  custom_elements: [{ 'content:encoded': postInfo.html }]
                };
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                filter: {fields: {sourceName: {eq: "blog"}}},
                sort: { order: DESC, fields: [fields___date] },
              ) {
                edges {
                  node {
                    id
                    html
                    excerpt
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      category
                      tags
                    }
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
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/.well-known/matrix/*': [
            'Content-Type: application/json',
            'Access-Control-Allow-Origin: *',
            'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization'
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN
      }
    }
  ]
};
