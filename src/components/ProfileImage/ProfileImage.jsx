import React from 'react';
import { StaticImage } from "gatsby-plugin-image"

const ProfileImage = () => {
  return (
    <StaticImage
      src="../../images/Gavin-December-1989.png"
      layout="constrained"
      width={150*1.48}
      height={150}
      alt="Gavin December 1989"
    />
  )
};

export default ProfileImage;
