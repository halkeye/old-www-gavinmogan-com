import React, { Component } from 'react';
import Button from 'react-md/lib/Buttons';
import Link from 'gatsby-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasRSS from '@fortawesome/fontawesome-free-solid/faRss';
import UserLinks from '../UserLinks/UserLinks.jsx';
import config from '../../../data/SiteConfig';
import './Footer.scss';

class Footer extends Component {
  render () {
    const { userLinks } = this.props;
    const { siteRss, fixedFooter } = config;
    return (
      <footer className={fixedFooter ? 'footer footer-fixed' : 'footer'}>
        {userLinks ? <UserLinks config={config} labeled /> : null}
        <div className="notice-container">
          <div className="rss">
            <Link to={siteRss}>
              <Button
                flat
                secondary
                iconEl={<FontAwesomeIcon icon={fasRSS} size="2x" />}
              >
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
