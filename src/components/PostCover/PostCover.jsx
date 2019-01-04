import React from 'react';
import Img from 'gatsby-image';
import './PostCover.scss';

export default function PostCover ({ cover, className }) {
  if (!cover) {
    return (<Img
      outerWrapperClassName={className}
      className="post-cover-image-wrapper"
      src="/cover-image.jpg"
    />);
  }
  return (
    <Img
      outerWrapperClassName={className}
      className="post-cover-image-wrapper"
      {...cover.childImageSharp}
    />
  );
}
