import React, { Component } from "react";
import Img from "gatsby-image";
import "./PostCover.scss";

class PostCover extends Component {
  render() {
    const { postInfo } = this.props;
    if (!postInfo.cover) {
      return (
        <div
          style={{ backgroundImage: `url(/cover-image.jpg)`, height: `350px` }}
          className="md-grid md-cell--9 post-cover"
        />
      );
    }
    return (
      <Img
        outerWrapperClassName="post-preview-outer-wrapper"
        resolutions={postInfo.cover.childImageSharp.resolutions}
      />
    );
  }
}

export default PostCover;
