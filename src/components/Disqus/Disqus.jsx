import React, { Component } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasComment from '@fortawesome/fontawesome-free-solid/faComment';
import trimStart from 'lodash/trimStart';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import Avatar from 'react-md/lib/Avatars';
import Snackbar from 'react-md/lib/Snackbars';
import config from '../../../data/SiteConfig';

class Disqus extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }

  onSnackbarDismiss () {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment () {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'New comment available!' });
    this.setState({ toasts });
  }
  render () {
    const { postNode, expanded } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url =
      (config.disqusUrl || config.siteUrl) +
      config.pathPrefix +
      trimStart(postNode.fields.slug, '/');
    return (
      <Card className="md-grid md-cell md-cell--12">
        <CardTitle
          title="Comments"
          avatar={<Avatar icon={<FontAwesomeIcon icon={fasComment} />} />}
          expander={!expanded}
        />
        <CardText expandable={!expanded}>
          <ReactDisqusComments
            shortname={config.disqusShortname}
            identifier={post.title}
            title={post.title}
            url={url}
            category_id={post.category_id}
            onNewComment={this.notifyAboutComment}
          />
        </CardText>
        <Snackbar
          toasts={this.state.toasts}
          onDismiss={this.onSnackbarDismiss}
        />
      </Card>
    );
  }
}

export default Disqus;
