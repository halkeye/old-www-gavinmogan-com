import React, { Component } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles, Button } from '@material-ui/core';

import { userLinks } from '../../../data/SiteConfig';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%'
  }
});

class UserLinks extends Component {
  getLinkElements () {
    const { labeled } = this.props;
    return userLinks.map(link => (
      <Link to={link.url} key={link.label}>
        <Button variant="text" color="secondary" size="large">
          <FontAwesomeIcon icon={link.icon} size="2x" />
          &nbsp;
          &nbsp;
          {labeled ? link.label : ''}
        </Button>
      </Link>
    ));
  }
  render () {
    const { classes } = this.props;
    if (!userLinks) {
      return null;
    }
    return <div className={classes.root}>{this.getLinkElements()}</div>;
  }
}

export default withStyles(styles)(UserLinks);
