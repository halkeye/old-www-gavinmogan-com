import React, { Component } from 'react';
import Helmet from 'react-helmet';
import About from '../components/About/About.jsx';
import Layout from '../layouts/index.jsx';
import config from '../../data/SiteConfig.js';

class AboutPage extends Component {
  render () {
    return (
      <Layout>
        <div className="about-container">
          <Helmet>
            <title>{`About | ${config.siteTitle}`}</title>
          </Helmet>
          <About />
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
