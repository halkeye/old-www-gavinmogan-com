import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../layouts/index.jsx';
import PostListing from '../components/PostListing/PostListing.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import SEO from '../components/SEO/SEO.jsx';

class IndexPage extends React.Component {
  render () {
    const postEdges = this.props.data.allContentfulBlogPosts.edges;
    const { index, paginatedPagesCount } = this.props.pageContext;
    return (
      <Layout location={this.props.location}>
        <div className="index-container">
          <SEO postEdges={postEdges} />
          <PostListing postEdges={postEdges} />
          <Pagination index={index + 1} pageCount={paginatedPagesCount} />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allContentfulBlogPosts(
      limit: $limit
      skip: $skip
      sort: {fields: date, order: DESC}
    ) {
      totalCount
      edges {
        node {
          author {
            name
            slug
          }
          fields {
            url
          }
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
