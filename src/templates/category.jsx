import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class CategoryTemplate extends React.Component {
  render () {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allContentfulBlogPosts.edges;
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
    allContentfulBlogPosts(
      sort: {fields: date, order: DESC}
      limit: 1000
      filter: {category: {elemMatch: {slug: {eq: $category}}}}
    ) {
      totalCount
      edges {
        node {
          content {
            childMarkdownRemark {
              html
              excerpt
              timeToRead
            }
          }
          slug
          tags
          title
          date
          cover {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          category {
            slug
            title
          }
          author {
            slug
            name
          }
          contentful_id
        }
      }
    }
  }
`;
