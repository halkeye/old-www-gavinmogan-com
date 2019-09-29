import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

const ProfileImage = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "Gavin-December-1989.png" }) {
            childImageSharp {
              fixed(width: 150, height: 150, cropFocus: ENTROPY) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => (
        <Img
          {...data.file.childImageSharp}
          alt="Gavin December 1989"
          className="profile-img"
        />
      )}
    />
  );
};

export default ProfileImage;
