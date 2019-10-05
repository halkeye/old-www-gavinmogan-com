import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import trimStart from 'lodash/trimStart';

function SEO ({ postNode, postPath, postSEO, type, tags, categories }) {
  const defaultData = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          titleTemplate
          siteUrl
          siteDescription
          pathPrefix
          siteLogo
          siteTitleAlt
          userTwitter
        }
      }
    }
  `).site.siteMetadata;

  let title = defaultData.title;
  let description = defaultData.siteDescription;
  let image = defaultData.siteLogo;
  let date;
  let postURL;
  if (postNode) {
    title = postNode.title;
    description = postNode.description || postNode.excerpt;
    date = postNode.date;
    if (postNode.cover) {
      image = postNode.cover.fluid.src;
    }
    // FIXME - image = get(postNode, 'frontmatter.cover.childImageSharp.sizes.src');
    postURL = defaultData.siteUrl + defaultData.pathPrefix + trimStart(postPath || postNode.slug, '/');
  }
  image = defaultData.siteUrl + defaultData.pathPrefix + trimStart(image, '/');
  const blogURL = defaultData.siteUrl + defaultData.pathPrefix;
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: defaultData.siteTitleAlt ? defaultData.siteTitleAlt : ''
    }
  ];
  if (postURL) {
    schemaOrgJSONLD.push([
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: defaultData.siteTitleAlt ? defaultData.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description
      }
    ]);
  }
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="publisher" href="https://plus.google.com/+gavinmogan" />
      <link rel="author" href="https://plus.google.com/+gavinmogan" />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:site_name" content={defaultData.siteTitle} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={postURL || blogURL} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {image.includes('https://') && (
        <meta property="og:image:secure" content={image} />
      )}
      <meta
        property="fb:app_id"
        content={defaultData.siteFBAppID ? defaultData.siteFBAppID : ''}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {defaultData.userTwitter && <meta name="twitter:creator" content={defaultData.userTwitter} />}
      {defaultData.userTwitter && <meta name="twitter:site" content={defaultData.userTwitter} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Tags */}
      {date && (
        <meta
          name="article:published_time"
          content={new Date(date).toISOString()}
        />
      )}
      {tags && tags.map(tag => <meta name="article:tag" content={tag} key={tag} />)}
      {categories && categories.map(category => <meta name="article:section" content={category.title} key={category.slug} />)}
      <meta
        name="article:author"
        content="https://www.gavinmogan.com/about/"
      />
    </Helmet>
  );
}

SEO.defaultProps = {
  postNode: null,
  type: 'website',
  tags: [],
  categories: []
};

export default SEO;
