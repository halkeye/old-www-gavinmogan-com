import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

const ProfileImageLarge = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "Gavin-December-1989.png" }) {
            childImageSharp {
              fluid(maxWidth: 750, cropFocus: ENTROPY) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <Img
          style={{ width: '100%' }}
          {...data.file.childImageSharp}
          alt="Gavin December 1989"
        />
      )}
    />
  );
};

export default ProfileImageLarge;
