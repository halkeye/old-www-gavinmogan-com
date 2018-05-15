import React, { Component } from "react";
import Helmet from "react-helmet";
import Presentation from "../components/Project/Project";
import config from "../../data/SiteConfig";

const PresentationList = ({ edges, onlyCategory }) => (
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
        <Presentation
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

export default class PresentationsPage extends Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    const allCategory = Object.keys(
      edges
        .map(data => data.node.fields.category)
        .reduce((cur, category) => ({ ...cur, [category]: 1 }), {})
    ).filter(category => category);
    return (
      <div className="Presentations-container">
        <Helmet>
          <title>{`Presentations | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/presentations/`} />
        </Helmet>
        <h1>Presentations</h1>
        <div className="md-grid">
          <PresentationList edges={edges} />
          {allCategory.map(category => (
            <div key={category}>
              <h1>{category}</h1>
              <PresentationList edges={edges} onlyCategory={category} />
            </div>
          ))}
        </div>
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
                resolutions(width: 128) {
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