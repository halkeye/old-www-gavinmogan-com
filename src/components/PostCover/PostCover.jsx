import React from "react";
import Img from "gatsby-image";
import "./PostCover.scss";

export default function PostCover({ image }) {
  if (!image) {
    return (
      <div
        style={{ backgroundImage: `url(/cover-image.jpg)`, height: `350px` }}
        className="md-grid md-cell--9 post-cover"
      />
    );
  }
  return (
    <Img
      outerWrapperClassName="md-grid md-cell--9 post-cover"
      className="post-cover-image-wrapper"
      {...image.childImageSharp}
    />
  );
}
