import { graphql } from 'gatsby';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../layouts/index.jsx';
import './presentations.scss';

const PresentationList = ({ edges }) => (
  <div className="md-grid">
    {edges.map(edge => (
      <ItemBlock key={edge.node.id} edge={edge} urlPrefix="/presentations" />
    ))}
  </div>
);

export default class PresentationsPage extends Component {
  render () {
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <Layout location={this.props.location} title="Presentations">
        <div className="presentations-container">
          <Helmet>
            <title>Presentations</title>
          </Helmet>
          <SubHeader title="Presentations" />

          <PresentationList edges={edges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PresentationsPage {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { sourceName: { eq: "presentation" } } }
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
          id
          html
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 320) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            link
            links {
              type
              url
            }
            attachments {
              absolutePath
              publicURL
            }
          }
        }
      }
    }
  }
`;
