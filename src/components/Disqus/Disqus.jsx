import React, { Component } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasComment from '@fortawesome/fontawesome-free-solid/faComment';
import trimStart from 'lodash/trimStart';
import autobind from 'autobind-decorator';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  withStyles
} from '@material-ui/core';
import config from '../../../data/SiteConfig';

const styles = theme => ({
  root: {
    width: '100%'
  }
});

class Disqus extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toasts: []
    };
  }

  @autobind
  onSnackbarDismiss () {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  @autobind
  notifyAboutComment () {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'New comment available!' });
    this.setState({ toasts });
  }

  render () {
    const { classes, postNode } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url =
      (config.disqusUrl || config.siteUrl) +
      config.pathPrefix +
      trimStart(postNode.fields.slug, '/');
    return (
      <>
        <Card className={classes.root}>
          <CardHeader
            title="Comments"
            avatar={<Avatar><FontAwesomeIcon icon={fasComment} /></Avatar>}
          />
          <CardContent>
            <ReactDisqusComments
              shortname={config.disqusShortname}
              identifier={post.title}
              title={post.title}
              url={url}
              category_id={post.category_id}
              onNewComment={this.notifyAboutComment}
            />
          </CardContent>
        </Card>
        {'       '}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          autoHideDuration={6000}
          onClose={this.onSnackbarDismiss}
          open={this.state.toasts.length > 0}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={this.state.toasts.map(m => (<span key={m.text} id="message-id">{m.text}</span>))}
        />
      </>
    );
  }
}

export default withStyles(styles)(Disqus);
