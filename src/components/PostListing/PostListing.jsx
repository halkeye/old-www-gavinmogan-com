import React from 'react';
import PostPreview from '../PostPreview/PostPreview.jsx';
import { toPostInfo } from '../../postUtils';

const Grid = ({ children }) => <div>FIXME, {children}</div>

const PostListing = ({ nodes }) => {
  const postList = nodes.map(toPostInfo);
  return (
    <Grid>
      <div>
        {postList.map(post => (
          <PostPreview key={post.slug} postInfo={post} />
        ))}
      </div>
    </Grid>
  );
};

export default PostListing;
