import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class CategoryTemplate extends React.Component {
  render () {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout location={this.props.location} title={`Posts in category "${category}"`}>
        <div className="category-container">
          <Helmet>
            <title>{`Posts in category "${category}"`}</title>
          </Helmet>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default CategoryTemplate;

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
          id
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
                fluid(maxWidth: 800, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
