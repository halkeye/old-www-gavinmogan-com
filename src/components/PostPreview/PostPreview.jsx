import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import { Link } from 'gatsby';
import PostTags from '../PostTags/PostTags.jsx';
import PostCover from '../PostCover/PostCover.jsx';
import './PostPreview.scss';


const Grid = ({ children }) => <div>FIXME, {children}</div>
const CardMedia = ({ children }) => <div>FIXME, {children}</div>
const Card = ({ children }) => <div>FIXME, {children}</div>
const CardActionArea = ({ children }) => <div>FIXME, {children}</div>
const CardContent = ({ children }) => <div>FIXME, {children}</div>
const CardHeader = ({ children }) => <div>FIXME, {children}</div>
const Typography = ({ children }) => <div>FIXME, {children}</div>
const Avatar = ({ children }) => <div>FIXME, {children}</div>

const PostPreview = ({ postInfo }) => (
  <Card key={postInfo.slug} raised>
    <CardActionArea component={Link} to={postInfo.slug}>
      <CardMedia component={PostCover} cover={postInfo.cover} src={postInfo.cover?.fluid?.src || postInfo.cover?.fixed?.src} alt={postInfo.title} />
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
  postInfo: PropTypes.object.isRequired
};

export default PostPreview;
