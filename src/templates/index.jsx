import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layouts/index.jsx';
import PostListing from '../components/PostListing/PostListing.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import SEO from '../components/SEO/SEO.jsx';
import config from '../../data/SiteConfig.js';

export default class IndexPage extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const { index, paginatedPagesCount } = this.props.pathContext;
    return (
      <Layout>
        <div className="index-container">
          <Helmet>
            <title>{config.siteTitle}</title>
          </Helmet>
          <SEO postEdges={postEdges} />
          <PostListing postEdges={postEdges} />
          <Pagination index={index + 1} pageCount={paginatedPagesCount} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { fields: { sourceName: { eq: "blog" } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          timeToRead
          excerpt
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 800, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          fields {
            tags
            category
            date
            slug
          }
        }
      }
    }
  }
`;
