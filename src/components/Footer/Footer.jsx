import React from 'react';
import { withStyles } from '@material-ui/core';

import UserLinks from '../UserLinks/UserLinks.jsx';

const styles = theme => ({
  root: {
    padding: '10px 5px 5px',
    backgroundColor: '#bdbdbd'
  }
});

const Footer = ({ skipLinks, classes }) => (
  <footer className={classes.root}>
    {!skipLinks ? <UserLinks labeled /> : null}
  </footer>
);

export default withStyles(styles)(Footer);
