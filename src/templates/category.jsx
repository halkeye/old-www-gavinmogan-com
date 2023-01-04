import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class CategoryTemplate extends React.Component {
  render () {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allFile.edges;
    return (
      <Layout location={this.props.location} title={`Posts in category "${category}"`}>
        <div className="category-container">
          <Helmet>
            <title>{`Posts in category "${category}"`}</title>
          </Helmet>
          <PostListing postEdges={postEdges.map(edge => edge.childMarkdownRemark)} />
        </div>
      </Layout>
    );
  }
}

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allFile(
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
      filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {fields: {category: {eq: $category}}}}
      limit: 1000
    ) {
      pageInfo {
        itemCount
        totalCount
        pageCount
        hasNextPage
        currentPage
        hasPreviousPage
        perPage
      }
      edges {
        node {
          childMarkdownRemark {
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
                  gatsbyImageData(width: 800)
                }
              }
              date
            }
          }
        }
      }
    }
  }
`;
