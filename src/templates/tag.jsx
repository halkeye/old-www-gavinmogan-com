import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../layouts/index.jsx';

class TagTemplate extends React.Component {
  render () {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allFile.edges;
    return (
      <Layout location={this.props.location} title={`Posts tagged as "${tag}"`}>
        <div className="tag-container">
          <Helmet>
            <title>{`Posts tagged as "${tag}"`}</title>
          </Helmet>
          <PostListing postEdges={postEdges.map(e => e.childMarkdownRemark)} />
        </div>
      </Layout>
    );
  }
}

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allFile(
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
      filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {fields: {tags: {in: [$tag]}}}}
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
                  gatsbyImageData(width: 800)
                }
              }
            }
          }
        }
      }
    }
  }
`;
