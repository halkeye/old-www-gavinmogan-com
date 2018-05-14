import React, { Component } from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import { Button, Card, CardText, CardTitle, CardActions } from "react-md";
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

export default class ProjectsPage extends Component {
  render() {
    return (
      <div className="computer-container">
        <Helmet>
          <title>{`Projects | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/computers/`} />
        </Helmet>
        <h1>Projects</h1>
        <div className="md-grid">
          {this.props.data.allMarkdownRemark.edges.map(data => {
            const {
              node: {
                fields: { slug },
                frontmatter: { image, link, links, title },
                html
              }
            } = data;
            return (
              <Card key={slug} className="md-cell md-cell--9">
                <CardTitle
                  title={title}
                  avatar={<Img {...image.childImageSharp} />}
                />
                <CardText>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </CardText>
                <CardActions>
                  {[{ type: "web", url: link }].concat(links).map(l => (
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
          })}
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
