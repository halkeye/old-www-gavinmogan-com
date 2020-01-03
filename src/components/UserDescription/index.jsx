import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

function UserDescription () {
  const { site: { siteMetadata: { userDescription } } } = useStaticQuery(graphql`
  query UserDescriptionQuery {
    site {
      siteMetadata {
        userDescription
      }
    }
  }`);
  const parts = userDescription.split('.');
  return (
    <>
      {parts.map((elm, idx) => <p key={idx}>{elm}{`${idx !== parts.length - 1 ? '.' : ''}`}</p>)}
    </>
  );
}

export default UserDescription;
