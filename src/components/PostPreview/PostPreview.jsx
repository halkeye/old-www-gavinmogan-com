import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Avatar
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import { Link } from 'gatsby';
import PostTags from '../PostTags/PostTags.jsx';
import PostCover from '../PostCover/PostCover.jsx';
import './PostPreview.scss';

const styles = theme => ({
  postPreview: {
    marginBottom: '20px'
  },
  postPreviewCover: {
  },
  postCover: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%'
  },
  media: {
    objectFit: 'cover'
  },
  linkStyle: {
    textDecoration: 'none'
  }
});

const PostPreview = ({ postInfo, classes }) => (
  <Card key={postInfo.path} raised className={classes.postPreview}>
    <CardActionArea component={Link} className={classes.linkStyle} to={postInfo.path}>
      <CardMedia component={PostCover} cover={postInfo.cover} className={classes.postPreviewCover} alt={postInfo.title} />
      <CardContent>
        <Grid>
          <Typography gutterBottom variant="h5" component="h2">
            {postInfo.title}
          </Typography>
        </Grid>
      </CardContent>
    </CardActionArea>
    <CardContent>
      <Typography component="p">
        {postInfo.excerpt}
      </Typography>
      <PostTags tags={postInfo.tags} />
      <CardHeader
        avatar={<Avatar><FontAwesomeIcon icon={fasCalendar} /></Avatar>}
        title={`Published on ${postInfo.date}`}
        subtitle={`${postInfo.timeToRead} min read`}
      />
    </CardContent>
  </Card>
);

PostPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  postInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(PostPreview);
