import React from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import {
  Button,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Media,
  MediaOverlay,
  Chip
} from 'react-md/lib';
import ItemBlockLinks from '../ItemBlockLinks/ItemBlockLinks.jsx';

import './itemblock.scss';

export default function ItemBlock ({ edge, urlPrefix }) {
  const {
    node: {
      fields: { slug, tags },
      frontmatter: { image, link, links, title, attachments },
      html,
      excerpt
    }
  } = edge;
  return (
    <Card key={slug} className="itemblock">
      <Link to={`${urlPrefix}${slug}`}>
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
                GO
              </Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
      </Link>
      <CardText>
        {tags && <div>{tags.map(tag => <Chip key={tag} label={tag} />)}</div>}
        <span dangerouslySetInnerHTML={{ __html: excerpt || html }} />
      </CardText>
      {links && (
        <CardActions className="md-divider-border md-divider-border--top">
          {links.map(l => (
            <ItemBlockLinks
              key={`link_${l.type}`}
              {...l}
              attachments={attachments}
            />
          ))}
        </CardActions>
      )}
    </Card>
  );
}
