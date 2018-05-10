import React, { Component } from "react";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'

import Button from "react-md/lib/Buttons";
import "./UserLinks.scss";


fontawesome.library.add(brands, solid)

class UserLinks extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config;
    const { labeled } = this.props;
    return userLinks.map(link => (
      <Button
        icon={!labeled}
        flat={labeled}
        secondary
        key={link.label}
        href={link.url}
        iconEl={<FontAwesomeIcon size="2x" icon={link.icon} />}
      >
        {labeled ? link.label : ""}
      </Button>
    ));
  }
  render() {
    const { userLinks } = this.props.config;
    if (!userLinks) {
      return null;
    }
    return <div className="user-links">{this.getLinkElements()}</div>;
  }
}

export default UserLinks;
