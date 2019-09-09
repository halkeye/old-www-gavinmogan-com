import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Image from 'gatsby-image';
import './PostCover.scss';

export default function PostCover ({ cover, className }) {
  if (!cover) {
    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "cover-image.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `);
    cover = data?.file;
  }
  return (
    <Image
      outerWrapperClassName={className}
      className="post-cover-image-wrapper"
      {...cover}
    />
  );
}
