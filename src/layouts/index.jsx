import { Link } from 'gatsby';
import React from 'react';
import {
  AppBar,
  ClickAwayListener,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  Drawer,
  withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Headers from './Headers.jsx';
import Footer from '../components/Footer/Footer.jsx';
import GetNavList from '../components/Navigation/NavList.jsx';
import ProfileImage from '../components/ProfileImage/ProfileImage.jsx';
import config from '../../data/SiteConfig.js';
import './index.scss';
import './global.scss';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
});

class MainLayout extends React.Component {
  constructor (props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  handleClickAway = () => {
    this.setState({ drawerOpen: false });
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render () {
    const { classes, children, title } = this.props;
    return (
      <div className={classes.root}>
        <Headers />
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              {title || 'Home'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawerOpen}>
          <div className={classes.list}>
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <List>
                {
                  GetNavList(config).map((userLink, idx) => {
                    if (userLink.divider) {
                      return <Divider key={idx} />;
                    }
                    if (userLink.href) {
                      return (
                        <ListItem key={idx}>
                          <a tabIndex={idx} role="button" href={userLink.href}>{userLink.leftIcon} {userLink.primaryText}</a>
                        </ListItem>
                      );
                    }
                    return (
                      <ListItem key={idx}>
                        <Link tabIndex={idx} role="button" to={userLink.to}>{userLink.leftIcon} {userLink.primaryText}</Link>
                      </ListItem>
                    );
                  })
                }
              </List>
            </ClickAwayListener>
          </div>
        </Drawer>
        <section id="page">
          <main id="body" className={classes.content}>
            {children}
          </main>
          <aside id="profile">
            <ProfileImage />
            <h1>Gavin Mogan</h1>
            <h2>
              Hi. I&apos;m Gavin. I&apos;m a coder at Sauce Labs. At home I
              code, game, hang out, all the cool non robot things to do.
              #notarobot
            </h2>
            <p><strong>Warning:</strong> Slowly migrating to material-ui, so errors are happening.</p>
            <p>Friends Sites</p>
            <ul>
              <li>
                <a rel="friend" href="https://forgreatjustice.ca/">
                  For Great Justice
                </a>{' '}
                (<Link to="/tags/nigel">Nigel</Link>)
              </li>
            </ul>
            <p>Badges</p>
            <a title="I Use Firefox" rel="nofollow" href="https://www.mozilla.org/firefox/this-browser-comes-highly-recommended/?utm_source=devs-for.firefox.com&utm_medium=referral&utm_campaign=devs-for-firefox&utm_content=I-Use-Firefox">
              <img style={{ border: '0 none' }}
                alt="I Use Firefox"
                srcSet="//code.cdn.mozilla.net/for-firefox/badges/assets/I-Use-Firefox.png,
                //code.cdn.mozilla.net/for-firefox/badges/assets/I-Use-Firefox-2x.png 2x"
                src="//code.cdn.mozilla.net/for-firefox/badges/assets/I-Use-Firefox.png" />
            </a>
          </aside>
        </section>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
