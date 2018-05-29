import React from "react";
import PostPreview from "../PostPreview/PostPreview";
import { toPostInfo } from "../../postUtils";
import "./style.scss";

class PostListing extends React.Component {
  render() {
    const postList = this.props.postEdges.map(toPostInfo);
    return (
      <div className="post-listing">
        <div className="md-grid md-cell--12 mobile-fix">
          {postList.map(post => (
            <PostPreview key={post.path} postInfo={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostListing;
