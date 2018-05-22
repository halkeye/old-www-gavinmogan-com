import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation/Navigation";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(new RegExp(`^${pathPrefix}`), "")
      .split("/");
    let title = capitalize(currentPath[0]);
    if (currentPath[0] === "") {
      title = "Home";
    } else if (currentPath[0] === "about") {
      title = "About";
    } else if (currentPath[0] === "computers") {
      title = "Computers";
    } else if (currentPath[0] === "tags") {
      const tag = currentPath[1];
      title = "Tags";
      if (tag) {
        title = `Tagged in ${capitalize(tag)}`;
      }
    } else if (currentPath[0] === "categories") {
      const category = currentPath[1];
      title = "Categories";
      if (category) {
        title = `Category - ${capitalize(category)}`;
      }
    } else if (currentPath[0] === "projects") {
      const project = currentPath[1];
      title = "Projects";
      if (project) {
        title = `Project - ${capitalize(project)}`;
      }
    } else if (currentPath[0] === "presentations") {
      const presentation = currentPath[1];
      title = "Presentations";
      if (presentation) {
        title = `Presentation - ${capitalize(presentation)}`;
      }
    }
    return title;
  }
  render() {
    const { children } = this.props;
    return (
      <Navigation config={config} LocalTitle={this.getLocalTitle()}>
        <div>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
          </Helmet>
          {children()}
        </div>
      </Navigation>
    );
  }
}
