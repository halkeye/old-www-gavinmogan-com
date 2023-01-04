import React from 'react';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import './PostCover.scss';

export default function PostCover ({ cover, className }) {
  if (!cover) {
    <StaticImage
      src="../../images/cover-image.jpg"
      layout="fluid"
      height={750}
      alt="Cover Image"
      className={`post-cover-image-wrapper ${className}`}
    />
  }
  const image = getImage(cover)
  return (
    <GatsbyImage
      image={image}
      className={`post-cover-image-wrapper ${className}`}
    />
  );
}
