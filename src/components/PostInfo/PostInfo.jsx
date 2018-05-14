import React, { Component } from "react";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Avatar from "react-md/lib/Avatars";
import Link from "gatsby-link";
import _ from "lodash";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import fasCalendar from "@fortawesome/fontawesome-free-solid/faCalendar";
import fasFolderOpen from "@fortawesome/fontawesome-free-solid/faFolderOpen";
import "./PostInfo.scss";

class PostInfo extends Component {
  render() {
    const { postNode } = this.props;
    const post = postNode.frontmatter;
    return (
      <div className="post-info">
        <CardTitle
          avatar={
            <Avatar
              icon={<FontAwesomeIcon icon={fasCalendar} className="md-icon" />}
            />
          }
          title={`Published on ${post.date}`}
          subtitle={`${postNode.timeToRead} min read`}
        />
        <Link
          className="category-link"
          to={`/categories/${_.kebabCase(post.category)}`}
        >
          <CardTitle
            avatar={
              <Avatar
                icon={
                  <FontAwesomeIcon icon={fasFolderOpen} className="md-icon" />
                }
              />
            }
            title="In category"
            subtitle={post.category}
          />
        </Link>
      </div>
    );
  }
}

export default PostInfo;
