import { graphql } from 'gatsby';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import Layout from '../layouts/index.jsx';

const ProjectList = ({ edges, onlyCategory }) => (
  <div className="md-grid">
    {edges.map(edge => {
      const {
        node: {
          fields: { category }
        }
      } = edge;
      if (onlyCategory && onlyCategory !== category) {
        return null;
      }
      if (!onlyCategory && category) {
        return null;
      }
      return <ItemBlock key={edge.node.id} edge={edge} urlPrefix="/projects" />;
    })}
  </div>
);

export default class ProjectsPage extends Component {
  render () {
    const { edges } = this.props.data.allMarkdownRemark;
    const allCategory = Object.keys(
      edges
        .map(data => data.node.fields.category)
        .reduce((cur, category) => ({ ...cur, [category]: 1 }), {})
    ).filter(category => category);
    return (
      <Layout location={this.props.location} title="Projects">
        <div className="projects-container">
          <Helmet>
            <title>Projects</title>
          </Helmet>
          <SubHeader title="Projects" />

          <div>
            <ProjectList edges={edges} />
            {allCategory.map(category => (
              <div key={category}>
                <SubHeader title={category} />
                <ProjectList edges={edges} onlyCategory={category} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectsPage {
    allMarkdownRemark(filter: { fields: { sourceName: { eq: "project" } } }) {
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
