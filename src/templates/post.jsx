import React from "react";
import RehypeReact from "rehype-react";
import Gist from "react-gist";

import Helmet from "react-helmet";
import { Card, CardText, Media } from "react-md";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import PostCover from "../components/PostCover/PostCover";
import PostInfo from "../components/PostInfo/PostInfo";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import PostSuggestions from "../components/PostSuggestions/PostSuggestions";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import { toPostInfo } from "../postUtils";
import "./b16-tomorrow-dark.css";
import "./post.scss";

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { "github-gist": Gist }
}).Compiler;

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const { slug } = this.props.pathContext;
    const expanded = !mobile;
    const postOverlapClass = mobile ? "post-overlap-mobile" : "post-overlap";
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="post-page md-grid md-grid--no-spacing">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${post.id}`} />
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div
          className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}
        >
          <Card className="md-grid md-cell md-cell--12 post">
            <PostCover postInfo={toPostInfo({ node: postNode })} />
            <CardText className="post-body">
              <h1 className="md-display-2 post-header">{post.title}</h1>
              <PostInfo postNode={postNode} />
              {renderAst(postNode.htmlAst)}
            </CardText>
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
            resolutions(height: 225, width: 724) {
              ...GatsbyImageSharpResolutions
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
