import { Link } from 'gatsby';
import React from 'react';
import Headers from './Headers.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import ProfileImage from '../components/ProfileImage/ProfileImage.jsx';
import config from '../../data/SiteConfig.js';
import './index.scss';
import './global.scss';

export default class MainLayout extends React.Component {
  render () {
    const {
      children, title
    } = this.props;
    return (
      <Navigation config={config} LocalTitle={title || 'Home'}>
        <Headers />
        <div>
          <div id="page">
            <section id="body">{children}</section>
            <section id="profile">
              <ProfileImage />
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
