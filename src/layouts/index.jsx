import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import Navigation from '../components/Navigation/Navigation.jsx';
import config from '../../data/SiteConfig.js';
import './index.scss';
import './global.scss';

export default class MainLayout extends React.Component {
  getLocalTitle () {
    return '';
    /*

    function capitalize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : '/';
    const currentPath = this.props.location.pathname
      .replace(new RegExp(`^${pathPrefix}`), '')
      .split('/');
    let title = capitalize(currentPath[currentPath.length - 1]);
    if (currentPath[0] === '') {
      title = 'Home';
    } else if (currentPath[0] === 'about') {
      title = 'About';
    } else if (currentPath[0] === 'computers') {
      title = 'Computers';
    } else if (currentPath[0] === 'tags') {
      const tag = currentPath[1];
      title = 'Tags';
      if (tag) {
        title = `Tagged in ${capitalize(tag)}`;
      }
    } else if (currentPath[0] === 'categories') {
      const category = currentPath[1];
      title = 'Categories';
      if (category) {
        title = `Category - ${capitalize(category)}`;
      }
    } else if (currentPath[0] === 'projects') {
      const project = currentPath[1];
      title = 'Projects';
      if (project) {
        title = `Project - ${capitalize(project)}`;
      }
    } else if (currentPath[0] === 'presentations') {
      const presentation = currentPath[1];
      title = 'Presentations';
      if (presentation) {
        title = `Presentation - ${capitalize(presentation)}`;
      }
    }
    return title;
    */
  }
  render () {
    const {
      children
    } = this.props;
    return (
      <Navigation config={config} LocalTitle={this.getLocalTitle()}>
        <div>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
          </Helmet>
          <div id="page">
            <section id="body">{children}</section>
            <section id="profile">
              <StaticQuery
                query={graphql`
                {
                  file(relativePath: { eq: "Gavin-December-1989.png" }) {
                    childImageSharp {
                        fixed(width: 150, height: 150) {
                          ...GatsbyImageSharpFixed
                        }
                    }
                  }
                }
                `}
                render={data => {
                  return <Img
                    {...data.file.childImageSharp}
                    alt="Gavin December 1989"
                    className="profile-img"
                  />;
                }}
              />
              <h1>Gavin Mogan</h1>
              <h2>
                Hi. I&apos;m Gavin. I&apos;m a coder at Sauce Labs. At home I
                code, game, hang out, all the cool non robot things to do.
                #notarobot
              </h2>
              <p>Friends Sites</p>
              <ul>
                <li>
                  <a rel="friend" href="https://forgreatjustice.ca/">
                    For Great Justice
                  </a>{' '}
                  (<Link to="/tags/nigel">Nigel</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Navigation>
    );
  }
}
