import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import './PostCover.scss';

export default function PostCover ({ cover, className }) {
  if (!cover) {
    return (
      <StaticQuery
        query={graphql`
        query {
          file(relativePath: { eq: "cover-image.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 750) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
        render={data => <PostCover cover={data.file} className={className} />}
      />
    );
  }
  return (
    <Img
      outerWrapperClassName={className}
      className="post-cover-image-wrapper"
      {...cover.childImageSharp}
    />
  );
}
