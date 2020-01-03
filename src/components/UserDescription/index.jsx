import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

function UserDescription () {
  const data = useStaticQuery(graphql`
  query UserDescriptionQuery {
    site {
      siteMetadata {
        userDescription
      }
    }
  }`);
  const parts = (data?.site?.siteMetadata?.userDescription || '').split('.');
  return (
    <>
      {parts.map((elm, idx) => <p key={idx}>{elm}{`${idx !== parts.length - 1 ? '.' : ''}`}</p>)}
    </>
  );
}

export default UserDescription;
