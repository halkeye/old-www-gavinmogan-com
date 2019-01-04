import React from 'react';
import {
  Avatar,
  CardHeader,
  Grid,
  withStyles
} from '@material-ui/core';
import { Link } from 'gatsby';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import fasFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';

const styles = theme => ({
  CategoryLink: {
    marginRight: `${theme.spacing.unit * 3}px`
  }
});

function PostInfo ({ postNode, classes }) {
  const post = postNode.frontmatter;
  return (
    <Grid container justify="space-between" direction="row">
      <Grid item>
        <CardHeader
          avatar={<Avatar><FontAwesomeIcon icon={fasCalendar} className="md-icon" /></Avatar>}
          title={`Published on ${post.date}`}
          subheader={`${postNode.timeToRead} min read`}
        />
      </Grid>
      <Grid item className={classes.CategoryLink}>
        <Link to={`/categories/${_.kebabCase(post.category)}`}>
          <CardHeader
            avatar={<Avatar><FontAwesomeIcon icon={fasFolderOpen} className="md-icon" /></Avatar>}
            title="In category"
            subheader={post.category}
          />
        </Link>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PostInfo);
