import React from 'react';
import {
  Avatar,
  CardHeader,
  Grid,
  withStyles
} from '@material-ui/core';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import fasFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';

const styles = theme => ({
  CategoryLink: {
    marginRight: `${theme.spacing(3)}px`
  }
});

function PostInfo ({ postNode, classes }) {
  return (
    <Grid container justify="space-between" direction="row">
      <Grid item>
        <CardHeader
          avatar={<Avatar><FontAwesomeIcon icon={fasCalendar} className="md-icon" /></Avatar>}
          title={`Published on ${postNode.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}`}
          subheader={`${postNode.timeToRead} min read`}
        />
      </Grid>
      <Grid item className={classes.CategoryLink}>
        {postNode.categories.map(category => (
          <Link key={category.slug} to={`/categories/${kebabCase(category.slug)}`}>
            <CardHeader
              avatar={<Avatar><FontAwesomeIcon icon={fasFolderOpen} className="md-icon" /></Avatar>}
              title="In category"
              subheader={category.title}
            />
          </Link>
        ))}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PostInfo);
