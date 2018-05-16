import React, { Component } from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Media,
  MediaOverlay,
  Chip
} from "react-md";
import config from "../../data/SiteConfig";
import "./presentations.scss";

const PresentationList = ({ edges }) => (
  <div className="md-grid">
    {edges.map(data => {
      const {
        node: {
          fields: { slug, tags },
          frontmatter: { image, link, links, title },
          html
        }
      } = data;
      return (
        <Card key={slug} className="md-cell md-cell--6 md-cell--8-tablet">
          <Media>
            {image && <Img {...image.childImageSharp} />}
            <MediaOverlay>
              <CardTitle title={title}>
                <Button
                  className="md-cell--right"
                  target="blank"
                  raised
                  secondary
                  href={link}
                >
                  Go
                </Button>
              </CardTitle>
            </MediaOverlay>
          </Media>
          <CardText>
            {tags && (
              <div>{tags.map(tag => <Chip key={tag} label={tag} />)}</div>
            )}
            <span dangerouslySetInnerHTML={{ __html: html }} />
          </CardText>
          <CardActions>
            {(links || []).map(l => (
              <Button flat key={l.type} target="blank" href={l.url}>
                {l.type}
              </Button>
            ))}
          </CardActions>
        </Card>
      );
    })}
  </div>
);

export default class PresentationsPage extends Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <div className="presentations-container">
        <Helmet>
          <title>{`Presentations | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/presentations/`} />
        </Helmet>
        <Card className="md-grid md-cell md-cell--12">
          <CardTitle title="Presentations" className="page-title" />
        </Card>

        <PresentationList edges={edges} />
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
                sizes(maxHeight: 250) {
                  ...GatsbyImageSharpSizes
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
