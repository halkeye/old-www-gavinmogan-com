import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export const Headers = ({ data }) => (
  <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
    <meta name="description" content={data.site.siteMetadata.siteDescription} />
  </Helmet>
);

Headers.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        siteDescription: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

const HeaderWrapper = (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteDescription
          }
        }
      }
    `}
    render={data => <Headers data={data} {...props} />}
  />
);
export default HeaderWrapper;
