import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';
import './PostTags.scss';

const Chip = ({ children }) => <div>FIXME, {children}</div>

class PostTags extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: 'none' }}
              to={`/tags/${kebabCase(tag)}`}
            >
              <Chip label={tag} className="post-preview-tags" />
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;
