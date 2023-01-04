import React from 'react';
import { StaticImage } from "gatsby-plugin-image"

const ProfileImageLarge = () => {
  return (
    <StaticImage
      src="../../images/Gavin-December-1989.png"
      style={{ width: '100%' }}
      alt="Gavin December 1989"
    />
  );
};

export default ProfileImageLarge;
