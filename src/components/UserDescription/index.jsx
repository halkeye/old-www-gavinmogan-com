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
    <p>
      {parts.map((elm, idx) => <React.Fragment key={idx}>{elm}{`${idx !== parts.length - 1 ? '.' : ''}`}</React.Fragment>)}
    </p>
  );
}

export default UserDescription;
