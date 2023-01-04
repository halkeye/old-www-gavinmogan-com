import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { toPostInfo } from '../postUtils.js';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../components/Layout.jsx';
import './presentations.scss';

const PresentationList = ({ nodes }) => (
  <div className="md-grid">
    {nodes.map(edge => (
      <ItemBlock
        key={edge.id}
        {...edge}
        html={edge.html}
        urlPrefix="/presentations/"
      />
    ))}
  </div>
);

const PresentationsPage = ({ data, location }) => {
  const nodes = data.allFile.edges.map(edge => toPostInfo(edge.childMarkdownRemark));
  return (
    <Layout location={location} title="Presentations">
      <div className="presentations-container">
        <Helmet>
          <title>Presentations</title>
        </Helmet>
        <SubHeader title="Presentations" />

        <PresentationList nodes={nodes} />
      </div>
    </Layout>
  );
};

export default PresentationsPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PresentationsPage {
    allFile(
      filter: {sourceInstanceName: {eq: "presentation"}}
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
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
          sourceInstanceName
          childMarkdownRemark {
            id
            excerpt
            timeToRead
            fields {
              slug
              category
              date
              tags
            }
            frontmatter {
              title
              tags
              date
              image {
                childImageSharp {
                  gatsbyImageData(height: 405)
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
  }
`;
