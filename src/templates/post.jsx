import { graphql } from 'gatsby';
import React from 'react';
import RehypeReact from 'rehype-react';
import Gist from 'react-gist';
import Helmet from 'react-helmet';

import {
  Card,
  CardContent,
  withStyles
} from '@material-ui/core';

import Layout from '../layouts/index.jsx';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import Disqus from '../components/Disqus/Disqus.jsx';
import PostTags from '../components/PostTags/PostTags.jsx';
import PostCover from '../components/PostCover/PostCover.jsx';
import PostInfo from '../components/PostInfo/PostInfo.jsx';
import SocialLinks from '../components/SocialLinks/SocialLinks.jsx';
import PostSuggestions from '../components/PostSuggestions/PostSuggestions.jsx';
import SEO from '../components/SEO/SEO.jsx';
import config from '../../data/SiteConfig.js';
import { toPostInfo } from '../postUtils.js';
import './b16-tomorrow-dark.css';
import './post.scss';

const styles = theme => ({
  p: {
    margin: '15px 0'
  },
  root: {
    width: '100%',
    marginBottom: '2em'
  }
});

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'github-gist': Gist }
}).Compiler;

class PostTemplate extends React.Component {
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
    const { mobile } = this.state;
    const { pageContext: { slug } } = this.props;
    const expanded = !mobile;
    const postOverlapClass = mobile ? 'post-overlap-mobile' : 'post-overlap';
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <Layout location={this.props.location} title={post.title}>
        <div className="post-page md-grid md-grid--no-spacing">
          <Helmet>
            <title>{post.title}</title>
          </Helmet>
          <SEO
            postPath={slug}
            postNode={postNode}
            postSEO
            type="article"
            tags={postNode.frontmatter.tags}
            category={postNode.frontmatter.category}
          />
          <PostCover cover={toPostInfo({ node: postNode }).cover} />
          <div
            className={`md-grid md-cell--12 post-page-contents mobile-fix ${postOverlapClass}`}
          >
            <Card className="md-grid md-cell md-cell--12 post">
              <CardContent className="post-body">
                <h1 className="md-display-2 post-header">{post.title}</h1>
                <PostInfo postNode={postNode} />
                {renderAst(postNode.htmlAst)}
              </CardContent>
              <div className="post-meta">
                <PostTags tags={post.tags} />
                <SocialLinks
                  postPath={slug}
                  postNode={postNode}
                  mobile={mobile}
                />
              </div>
            </Card>
            <UserInfo
              className="md-grid md-cell md-cell--12"
              config={config}
              expanded={expanded}
            />
            <Disqus postNode={postNode} expanded={expanded} />
          </div>

          <PostSuggestions postNode={postNode} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 300, cropFocus: ENTROPY) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        date
        category
        tags
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
      }
    }
  }
`;
export default withStyles(styles)(PostTemplate);
