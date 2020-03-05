import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export const Headers = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteDescription
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
      <meta name="description" content={data.site.siteMetadata.siteDescription} />
    </Helmet>
  );
};

export default Headers;
