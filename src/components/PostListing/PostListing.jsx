import React from 'react';
import PostPreview from '../PostPreview/PostPreview.jsx';
import {
  withStyles,
  Grid
} from '@material-ui/core';
import { toPostInfo } from '../../postUtils';

const styles = theme => ({
  postListing: {
    maxWidth: '1024px'
  }
});

const PostListing = ({ classes, postEdges }) => {
  const postList = postEdges.map(toPostInfo);
  return (
    <Grid>
      <div className={classes.postListing}>
        {postList.map(post => (
          <PostPreview key={post.path} postInfo={post} />
        ))}
      </div>
    </Grid>
  );
};

export default withStyles(styles)(PostListing);
