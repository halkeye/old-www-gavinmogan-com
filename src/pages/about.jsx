import React from 'react';
import Helmet from 'react-helmet';
import About from '../components/About/About.jsx';
import Layout from '../layouts/index.jsx';

function AboutPage ({ location }) {
  return (
    <Layout location={location} title="About">
      <div className="about-container">
        <Helmet>
          <title>About</title>
        </Helmet>
        <About />
      </div>
    </Layout>
  );
}

export default AboutPage;
