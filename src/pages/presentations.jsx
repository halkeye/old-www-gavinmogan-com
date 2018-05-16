import React, { Component } from "react";
import Helmet from "react-helmet";
import ItemBlock from "../components/ItemBlock/ItemBlock";
import SubHeader from "../components/SubHeader/SubHeader";
import config from "../../data/SiteConfig";
import "./presentations.scss";

const PresentationList = ({ edges }) => (
  <div className="md-grid">{edges.map(edge => <ItemBlock edge={edge} />)}</div>
);

export default class PresentationsPage extends Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <div className="presentations-container">
        <Helmet>
          <title>{`Presentations | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/presentations/`} />
        </Helmet>
        <SubHeader title="Presentations" />

        <PresentationList edges={edges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PresentationsPage {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { type: { eq: "presentation" } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
            tags
            category
          }
          html
          frontmatter {
            title
            image {
              childImageSharp {
                sizes(maxWidth: 320) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            link
            links {
              type
              url
            }
          }
        }
      }
    }
  }
`;
