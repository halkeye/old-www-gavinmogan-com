import React, { Component } from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import { Button, Card, CardText, CardTitle, CardActions, Chip } from "react-md";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import fabGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import fasQuestionCircle from "@fortawesome/fontawesome-free-solid/faQuestionCircle";
import fasGlobe from "@fortawesome/fontawesome-free-solid/faGlobe";
import config from "../../data/SiteConfig";

const linkTypes = {
  github: fabGithub,
  web: fasGlobe,
  "": fasQuestionCircle
};
const linkTypeNames = {
  web: "App",
  github: "Github"
};

const Project = ({ slug, tags, image, link, links, title, html }) => (
  <Card key={slug} className="md-cell md-cell--10">
    <CardTitle title={title} />
    <CardText>
      <div className="md-grid">
        {image && (
          <div className="md-cell--3">
            <Img {...image.childImageSharp} />
          </div>
        )}
        <div className="md-cell--9">
          {tags && <div>{tags.map(tag => <Chip key={tag} label={tag} />)}</div>}
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </CardText>
    <CardActions>
      {[{ type: "web", url: link }].concat(links || []).map(l => (
        <Button
          flat
          key={l.type}
          href={l.url}
          iconEl={
            <FontAwesomeIcon
              size="2x"
              icon={linkTypes[l.type] || linkTypes[""]}
            />
          }
        >
          {linkTypeNames[l.type] || l.type}
        </Button>
      ))}
    </CardActions>
  </Card>
);
const ProjectList = ({ edges, tag }) => (
  <div>
    {edges.map(data => {
      const {
        node: {
          fields: { slug, tags },
          frontmatter: { image, link, links, title },
          html
        }
      } = data;
      if (tag && !tags.includes(tag)) {
        return null;
      }
      if (!tag && tags.length !== 0) {
        return null;
      }
      return (
        <Project
          key={slug}
          html={html}
          slug={slug}
          tags={tags}
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
    const allTags = Object.keys(
      edges.map(data => data.node.fields.tags).reduce((cur, tags) => {
        const ret = { ...cur };
        tags.forEach(tag => {
          ret[tag] = 1;
        });
        return ret;
      }, {})
    ).filter(tag => tag);
    return (
      <div className="computer-container">
        <Helmet>
          <title>{`Projects | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/computers/`} />
        </Helmet>
        <h1>Projects</h1>
        <div className="md-grid">
          <ProjectList edges={edges} tag="" />
          {allTags.map(tag => (
            <div key={tag}>
              <h1>{tag}</h1>
              <ProjectList edges={edges} tag={tag} />
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
