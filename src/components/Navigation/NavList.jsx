import React from "react";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

function GetNavList(config) {
  const NavList = [
    {
      primaryText: "Home",
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: "/"
    },
    {
      divider: true
    }
  ];

  if (config.userLinks) {
    config.userLinks.forEach(link => {
      NavList.push({
        primaryText: link.label,
        leftIcon: <FontAwesomeIcon icon={link.icon} className="md-icon" />,
        component: "a",
        href: link.url
      });
    });
  }

  NavList.push({ divider: true });

  NavList.push({
    primaryText: "About",
    leftIcon: <FontIcon>person</FontIcon>,
    component: Link,
    to: "/about/"
  });
  NavList.push({
    primaryText: "Computers",
    leftIcon: <FontIcon>computer</FontIcon>,
    component: Link,
    to: "/computers/"
  });
  return NavList;
}
export default GetNavList;
