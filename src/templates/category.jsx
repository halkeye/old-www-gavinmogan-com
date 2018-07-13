import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import config from '../../data/SiteConfig.js';

export default class CategoryTemplate extends React.Component {
  render () {
    const { category } = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="category-container">
        <Helmet>
          <title>
            {`Posts in category "${category}" | ${config.siteTitle}`}
          </title>
        </Helmet>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { sourceName: { eq: "blog" }, category: { eq: $category } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
            category
          }
          frontmatter {
            title
            tags
            cover {
              childImageSharp {
                sizes(maxWidth: 800, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
            date
          }
        }
      }
    }
  }
`;
