import React from "react";
import PostPreview from "../PostPreview/PostPreview";
import { toPostInfo } from "../../postUtils";

class PostListing extends React.Component {
  getPostList() {
    return this.props.postEdges.map(toPostInfo);
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {postList.map(post => (
            <PostPreview key={post.path} postInfo={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostListing;
