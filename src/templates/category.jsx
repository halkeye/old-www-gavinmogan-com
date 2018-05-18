import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const { category, slug } = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="category-container">
        <Helmet>
          <title>
            {`Posts in category "${category}" | ${config.siteTitle}`}
          </title>
          <link rel="canonical" href={`${config.siteUrl}${slug}`} />
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
      filter: { fields: { type: { eq: "blog" }, category: { eq: $category } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover {
              childImageSharp {
                sizes(maxWidth: 800, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpSizes
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
