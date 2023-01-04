import React from 'react';
import { Helmet } from 'react-helmet';
import About from '../components/About/About.jsx';
import Layout from '../components/Layout.jsx';

function AboutPage () {
  return (
    <Layout title="About">
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
