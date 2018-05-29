import React, { Component } from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import trimStart from "lodash/trimStart";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO, type, tags, category } = this.props;
    let title;
    let description;
    let image;
    let date;
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      date = get(postNode, "frontmatter.date");
      image = get(postNode, "frontmatter.cover.childImageSharp.sizes.src");
      postURL = config.siteUrl + config.pathPrefix + trimStart(postPath, "/");
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }
    image = config.siteUrl + config.pathPrefix + trimStart(image, "/");
    const blogURL = config.siteUrl + config.pathPrefix;
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
      }
    ];
    if (postSEO) {
      schemaOrgJSONLD.push([
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": postURL,
                name: title,
                image
              }
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          image: {
            "@type": "ImageObject",
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
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {image.includes("https://") && (
          <meta property="og:image:secure" content={image} />
        )}
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ""}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ""}
        />
        <meta
          name="twitter:site"
          content={config.userTwitter ? config.userTwitter : ""}
        />
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
        {tags.map(tag => <meta name="article:tag" content={tag} />)}
        {category && <meta name="article:section" content={category} />}
        <meta
          name="article:author"
          content="https://www.gavinmogan.com/about/"
        />
      </Helmet>
    );
  }
}

SEO.defaultProps = {
  type: "website",
  tags: [],
  category: null
};

export default SEO;
