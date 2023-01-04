import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userLinks } from '../../../data/SiteConfig';

const Button = ({ children }) => <div>FIXME, {children}</div>

class UserLinks extends Component {
  getLinkElements () {
    const { labeled } = this.props;
    return userLinks.map(link => (
      <a href={link.url} key={link.label}>
        <Button variant="text" color="secondary" size="large">
          <FontAwesomeIcon icon={link.icon} size="2x" />
          &nbsp;
          &nbsp;
          {labeled ? link.label : ''}
        </Button>
      </a>
    ));
  }

  render () {
    if (!userLinks) {
      return null;
    }
    return <div>{this.getLinkElements()}</div>;
  }
}

export default UserLinks;
