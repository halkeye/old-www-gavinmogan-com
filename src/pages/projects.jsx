import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../layouts/index.jsx';
import { toPostInfo } from '../postUtils.js';

const ProjectList = ({ nodes, onlyCategory }) => (
  <div className="md-grid">
    {nodes.map(edge => {
      const category = edge.categories || [];
      if (onlyCategory && !category.map(c => c.slug).includes(onlyCategory)) {
        return null;
      }
      if (!onlyCategory && category.length) {
        return null;
      }
      return (
        <ItemBlock
          key={edge.id}
          {...edge}
          html={edge.html}
          urlPrefix="/projects/"
        />
      );
    })}
  </div>
);

const ProjectsPage = ({ data, location }) => {
  const nodes = data.allMarkdownRemark.edges.map(toPostInfo);
  const categories = new Set();
  nodes.forEach(node =>
    node.categories.forEach(cat => categories.add(cat.slug))
  );

  return (
    <Layout location={location} title="Projects">
      <div className="projects-container">
        <Helmet>
          <title>Projects</title>
        </Helmet>
        <SubHeader title="Projects" />

        <div>
          <ProjectList nodes={nodes} />
          {Array.from(categories).map(category => (
            <div key={category}>
              <SubHeader title={category} />
              <ProjectList nodes={nodes} onlyCategory={category} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectsPage {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { sourceName: { eq: "project" } } }
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
                fluid(maxHeight: 405, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
