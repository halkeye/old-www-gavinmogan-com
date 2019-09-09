import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../layouts/index.jsx';
import './presentations.scss';

const PresentationList = ({ edges }) => (
  <div className="md-grid">
    {edges.map(edge => (
      <ItemBlock
        key={edge.node.id}
        {...edge.node}
        html={edge.node.content.childMarkdownRemark.html}
        urlPrefix="/presentations/"
      />
    ))}
  </div>
);

const PresentationsPage = ({ data, location }) => {
  const { edges } = data.allContentfulPresentations;
  return (
    <Layout location={location} title="Presentations">
      <div className="presentations-container">
        <Helmet>
          <title>Presentations</title>
        </Helmet>
        <SubHeader title="Presentations" />

        <PresentationList edges={edges} />
      </div>
    </Layout>
  );
};

export default PresentationsPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PresentationsPage {
    allContentfulPresentations(sort: {order: DESC, fields: date}) {
      edges {
        node {
          id
          date
          link
          links {
            type
            url
          }
          slug
          tags
          title
          image {
            fluid(maxWidth: 800, maxHeight: 320, cropFocus: CENTER) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          attachments {
            file {
              url
              fileName
            }
          }
        }
      }
    }
  }
`;
