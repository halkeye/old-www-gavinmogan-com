import React, { Component } from 'react';
import Helmet from 'react-helmet';
import About from '../components/About/About.jsx';
import config from '../../data/SiteConfig.js';

class AboutPage extends Component {
  render () {
    return (
      <div className="about-container">
        <Helmet>
          <title>{`About | ${config.siteTitle}`}</title>
        </Helmet>
        <About />
      </div>
    );
  }
}

export default AboutPage;
