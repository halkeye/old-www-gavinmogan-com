import React from "react";
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

import "./itemblock.scss";

export default function ItemBlock({ edge }) {
  const {
    node: {
      fields: { slug, tags },
      frontmatter: { image, link, links, title },
      html
    }
  } = edge;
  return (
    <Card key={slug} className="itemblock">
      <Media>
        {image && <Img {...image.childImageSharp} />}
        <MediaOverlay>
          <CardTitle title={title}>
            <Button
              className="md-cell--right presentation-go-button"
              target="blank"
              type="button"
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
        {tags && <div>{tags.map(tag => <Chip key={tag} label={tag} />)}</div>}
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
}
