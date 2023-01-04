import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../components/Layout.jsx';
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
  const nodes = data.allFile.edges.map(edge => toPostInfo(edge.childMarkdownRemark));
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
    allFile(
      filter: {sourceInstanceName: {eq: "project"}}
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
          childMarkdownRemark {
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
                  gatsbyImageData(height: 405)
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
  }
`;
