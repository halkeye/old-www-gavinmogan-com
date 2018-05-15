import React, { Component } from "react";
import Helmet from "react-helmet";
import Project from "../components/Project/Project";
import config from "../../data/SiteConfig";

const ProjectList = ({ edges, onlyCategory }) => (
  <div>
    {edges.map(data => {
      const {
        node: {
          fields: { slug, tags, category },
          frontmatter: { image, link, links, title },
          html
        }
      } = data;
      if (onlyCategory && onlyCategory !== category) {
        return null;
      }
      if (!onlyCategory && category) {
        return null;
      }
      return (
        <Project
          key={slug}
          html={html}
          slug={slug}
          tags={tags}
          category={category}
          image={image}
          link={link}
          links={links}
          title={title}
        />
      );
    })}
  </div>
);

export default class ProjectsPage extends Component {
  render() {
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
          <link rel="canonical" href={`${config.siteUrl}/projects/`} />
        </Helmet>
        <h1>Projects</h1>
        <div className="md-grid">
          <ProjectList edges={edges} />
          {allCategory.map(category => (
            <div key={category}>
              <h1>{category}</h1>
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
    allMarkdownRemark(filter: { fields: { type: { eq: "project" } } }) {
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
                resolutions(height: 100, width: 100) {
                  ...GatsbyImageSharpResolutions
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
