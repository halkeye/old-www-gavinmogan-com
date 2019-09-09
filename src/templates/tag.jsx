import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class TagTemplate extends React.Component {
  render () {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allContentfulBlogPosts.edges;
    return (
      <Layout location={this.props.location} title={`Posts tagged as "${tag}"`}>
        <div className="tag-container">
          <Helmet>
            <title>{`Posts tagged as "${tag}"`}</title>
          </Helmet>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allContentfulBlogPosts(
      sort: {fields: date, order: DESC}
      limit: 1000
      filter: { tags: { in: [$tag] } }
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
              # ...GatsbyImageSharpFluid_withWebp_tracedSVG
              base64
              src
              srcSet
              aspectRatio
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
