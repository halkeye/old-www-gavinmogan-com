import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import ItemBlockLinks from '../ItemBlockLinks/ItemBlockLinks.jsx';
import PostCover from '../PostCover/PostCover.jsx';

const CardActionArea = ({ children }) => <div>FIXME, {children}</div>
const CardActions = ({ children }) => <div>FIXME, {children}</div>
const CardContent = ({ children }) => <div>FIXME, {children}</div>
const Card = ({ children }) => <div>FIXME, {children}</div>
const CardMedia = ({ children }) => <div>FIXME, {children}</div>
const Chip = ({ children }) => <div>FIXME, {children}</div>
const Typography = ({ children }) => <div>FIXME, {children}</div>

export default function ItemBlock ({ slug, tags, cover, link, links, title, attachments, html, excerpt, urlPrefix }) {
  const classes = useStyles();
  if (!cover) {
    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "joshua-aragon-FkjaN-7gWC0-unsplash.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 320, cropFocus: ENTROPY) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `);
    cover = data?.file?.childImageSharp;
  }

  return (
    <Card className={classes.card}>
      {/* <Link to={`${urlPrefix}${slug}`}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {title[0]}
            </Avatar>
          }
          title={title}
        />
      </Link> */}
      <CardActionArea>
        <a href={link}>
          {cover && (
            <CardMedia
              className={classes.media}
              component={PostCover}
              cover={cover}
              alt={title}
              // height="140"
              image={cover?.fluid?.src || cover?.fixed?.src}
              title={title}
            />
          )}
        </a>
        <CardContent>
          <Link to={`${urlPrefix}${slug}`}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </Link>
          {tags && (
            <div>
              {tags.map(tag => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            <span dangerouslySetInnerHTML={{ __html: excerpt || html }} />
          </Typography>
        </CardContent>
      </CardActionArea>
      {links && (
        <CardActions>
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
ItemBlock.defaultProps = {};
