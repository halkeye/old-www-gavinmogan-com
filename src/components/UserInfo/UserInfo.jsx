import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import { Follow } from 'react-twitter-widgets';
import UserLinks from '../UserLinks/UserLinks.jsx';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  p: {
    margin: '15px 0'
  },
  root: {
    width: '100%',
    marginBottom: '2em'
  }
});

class UserInfo extends Component {
  render () {
    const {
      userAvatar,
      userName,
      userLocation,
      userDescription,
      userLinks,
      userTwitter
    } = this.props.config;
    const { classes } = this.props;
    const userLinksElement = <UserLinks config={this.props.config}/>;

    if (!userAvatar && !userName && !userLocation && !userDescription) {
      if (userLinks) {
        return (
          <Card className={classes.root}>
            {userLinksElement}
          </Card>
        );
      }
      return null;
    }
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={userAvatar && <Avatar src={userAvatar} role="presentation" />}
          title={userName && userName}
          subtitle={
            userTwitter ? (
              <Follow
                username={userTwitter}
                options={{ count: 'none' }}
              />
            ) : (
              'Author'
            )
          }
        />
        <CardContent>
          {userLocation && (
            <IconSeparator label={userLocation} iconBefore>
              <FontAwesomeIcon icon={fasMapMarker} />
            </IconSeparator>
          )}
          <p>{userDescription && userDescription}</p>
          {userLinksElement}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(UserInfo);
