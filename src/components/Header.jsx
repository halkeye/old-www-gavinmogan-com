import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react'

import Footer from './Footer.jsx'
import UserDescription from '../components/UserDescription';
import ProfileImage from '../components/ProfileImage/ProfileImage'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteDescription
        }
      }
    }
  `);
  return (
    <header id="header">
      <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
        <meta name="description" content={data.site.siteMetadata.siteDescription} />
      </Helmet>
      <aside className="inner" id="profile">
        <ProfileImage />
        <h1>Gavin Mogan</h1>
        <UserDescription />
        <h2>Friends Sites</h2>
        <ul>
          <li>
            <a rel="friend" href="https://forgreatjustice.ca/">
              For Great Justice
            </a>{' '}
            (Nigel)
          </li>
        </ul>
        <h2>Federverse</h2>
        <ul>
          <li><a rel="me" href="https://toot.cafe/@halkeye">Mastodon</a></li>
          <li><a rel="me" href="https://matrix.to/#/@halkeye:g4v.dev">Matrix</a></li>
        </ul>
      </aside>
      <Footer />
    </header>
  );
}

export default Header
