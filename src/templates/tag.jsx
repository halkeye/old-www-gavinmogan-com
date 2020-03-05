import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class TagTemplate extends React.Component {
  render () {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
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
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { sourceName: { eq: "blog" }, tags: { in: [$tag] } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            tags
          }
          id
          excerpt
          timeToRead
          frontmatter {
            title
            date
            cover {
              childImageSharp {
                fluid(maxWidth: 800, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
