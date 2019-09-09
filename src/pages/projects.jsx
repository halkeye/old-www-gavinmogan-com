import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../layouts/index.jsx';

const ProjectList = ({ edges, onlyCategory }) => (
  <div className="md-grid">
    {edges.map(edge => {
      const category = edge.node.category || [];
      if (onlyCategory && !category.map(c => c.slug).includes(onlyCategory)) {
        return null;
      }
      if (!onlyCategory && category.length) {
        return null;
      }
      return <ItemBlock
        key={edge.node.id}
        {...edge.node}
        html={edge.node.content.childMarkdownRemark.html}
        urlPrefix="/projects/"
      />;
    })}
  </div>
);

const ProjectsPage = ({ data, location }) => {
  const { edges } = data.allContentfulProjects;
  const categories = new Set();
  edges.forEach(edge => (edge.node.category || []).forEach(cat => categories.add(cat.slug)));

  return (
    <Layout location={location} title="Projects">
      <div className="projects-container">
        <Helmet>
          <title>Projects</title>
        </Helmet>
        <SubHeader title="Projects" />

        <div>
          <ProjectList edges={edges} />
          {Array.from(categories).map(category => (
            <div key={category}>
              <SubHeader title={category} />
              <ProjectList edges={edges} onlyCategory={category} />
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
    allContentfulProjects(sort: {fields: title, order: ASC}) {
      totalCount
      edges {
        node {
          id
          link
          links {
            type
            url
          }
          slug
          tags
          title
          image {
            fluid(maxWidth: 750, maxHeight: 320, cropFocus: CENTER) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          links {
            type
            url
          }
          category {
            slug
            title
          }
        }
      }
    }
  }
`;
