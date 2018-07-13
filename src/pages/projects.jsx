import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import SubHeader from '../components/SubHeader/SubHeader.jsx';
import config from '../../data/SiteConfig.js';

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
      <div className="projects-container">
        <Helmet>
          <title>{`Projects | ${config.siteTitle}`}</title>
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
                sizes(maxWidth: 320) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
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
