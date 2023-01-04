import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import UserLinks from '../UserLinks/UserLinks.jsx';
import UserDescription from '../UserDescription';

const Follow = ({ children }) => <div>FIXME, {children}</div>
const IconSeparator = ({ children }) => <div>FIXME, {children}</div>
const Avatar = ({ children }) => <div>FIXME, {children}</div>
const Card = ({ children }) => <div>FIXME, {children}</div>
const CardContent = ({ children }) => <div>FIXME, {children}</div>
const CardHeader = ({ children }) => <div>FIXME, {children}</div>

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
          {/* eslint-disable-next-line react/jsx-key */}
          <UserDescription />
          {userLinksElement}
        </CardContent>
      </Card>
    );
  }
}

export default UserInfo;
