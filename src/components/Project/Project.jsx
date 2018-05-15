import React from "react";
import Img from "gatsby-image";
import { Button, Card, CardText, CardTitle, CardActions, Chip } from "react-md";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import fabGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import fasQuestionCircle from "@fortawesome/fontawesome-free-solid/faQuestionCircle";
import fasGlobe from "@fortawesome/fontawesome-free-solid/faGlobe";

const linkTypes = {
  github: fabGithub,
  web: fasGlobe,
  "": fasQuestionCircle
};
const linkTypeNames = {
  web: "App",
  github: "Github"
};

export default function Project({
  slug,
  tags,
  image,
  link,
  links,
  title,
  html
}) {
  return (
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
            {tags && (
              <div>{tags.map(tag => <Chip key={tag} label={tag} />)}</div>
            )}
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
}
