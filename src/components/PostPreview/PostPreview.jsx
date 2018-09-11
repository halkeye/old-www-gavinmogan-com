import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button, Avatar } from 'react-md/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import Link from 'gatsby-link';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import PostTags from '../PostTags/PostTags.jsx';
import PostCover from '../PostCover/PostCover.jsx';
import './PostPreview.scss';

class PostPreview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount () {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }
  render () {
    const { postInfo } = this.props;
    const { mobile } = this.state;
    const expand = mobile;
    return (
      <Card key={postInfo.path} raise className="md-grid md-cell md-cell--12">
        <Link style={{ textDecoration: 'none' }} to={postInfo.path}>
          <Media className="post-preview-cover" style={{ height: '185px' }}>
            <PostCover image={postInfo.cover} />
            <MediaOverlay>
              <CardTitle title={postInfo.title}>
                <Button raised secondary className="md-cell--right">
                  Read
                </Button>
              </CardTitle>
            </MediaOverlay>
          </Media>
        </Link>
        <CardTitle
          expander={expand}
          avatar={
            <Avatar
              icon={<FontAwesomeIcon icon={fasCalendar} className="md-icon" />}
            />
          }
          title={`Published on ${postInfo.date}`}
          subtitle={`${postInfo.timeToRead} min read`}
        />

        <CardText expandable={expand}>
          {postInfo.excerpt}
          <PostTags tags={postInfo.tags} />
        </CardText>
      </Card>
    );
  }
}

export default PostPreview;
