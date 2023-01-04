import React from 'react';
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

const CoverImage = ({ cover }) => {
  if (cover) {
      return (<GatsbyImage
        image={getImage(cover.childImageSharp)}
        className="cover-image"
        alt="Cover Image"
        layout="fixed"
        height={200}
        width={312}
      />)
  }
  return (
    <StaticImage
      src="../images/cover-image.jpg"
      className="cover-image"
      layout="fixed"
      alt="Gavin December 1989"
      height={200}
      width={312}
    />
  );
};

export default CoverImage;