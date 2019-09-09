import { graphql, Link } from 'gatsby';
import React from 'react';

import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  withStyles
} from '@material-ui/core';

import Layout from '../layouts/index.jsx';
import ItemBlockLinks from '../components/ItemBlockLinks/ItemBlockLinks.jsx';
import PostTags from '../components/PostTags/PostTags.jsx';
import PostCover from '../components/PostCover/PostCover.jsx';
import SocialLinks from '../components/SocialLinks/SocialLinks.jsx';
import SEO from '../components/SEO/SEO.jsx';
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

class ItemsTemplate extends React.Component {
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
    const { classes } = this.props;
    const { slug, urlPrefix } = this.props.pageContext;
    const type = `allContentful${this.props.pageContext.type}`;
    const postOverlapClass = mobile ? 'post-overlap-mobile' : 'post-overlap';
    const postNode = this.props.data[type];
    const {
      tags,
      category,
      image,
      link,
      links,
      title,
      attachments,
      html
    } = this.props.data[type];
    return (
      <Layout location={this.props.location} title={title}>
        <div className="post-page md-grid md-grid--no-spacing">
          <SEO
            postPath={slug}
            postNode={postNode}
            postSEO
            type="website"
            tags={tags}
            category={category}
          />
          <PostCover cover={image} />
          <div
            className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}
          >
            <Card className="md-grid md-cell md-cell--12 post">
              <Link to={urlPrefix}>&lt; Back</Link>
              <CardContent className="post-body">
                <Link to={link}>
                  <Typography className={classes.title} color="textSecondary" variant="h2">{title}</Typography>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </CardContent>
              <CardActions>
                <PostTags tags={tags} />
                <SocialLinks
                  postPath={slug}
                  postNode={postNode}
                  mobile={mobile}
                />
              </CardActions>
              {links && (
                <React.Fragment>
                  <Divider />
                  <CardActions className="md-divider-border md-divider-border--top">
                    {links.map(l => (
                      <ItemBlockLinks
                        key={`link_${l.type}`}
                        {...l}
                        attachments={attachments}
                      />
                    ))}
                  </CardActions>
                </React.Fragment>
              )}
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
    allContentfulProjects(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          link
          links {
            type
            url
          }
          slug
          tags
          title
          image {
            fluid(maxWidth: 800, maxHeight: 320, cropFocus: CENTER) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPresentations(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          date
          link
          links {
            type
            url
          }
          slug
          tags
          title
          image {
            fluid(maxWidth: 800, maxHeight: 320, cropFocus: CENTER) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          attachments {
            file {
              url
              fileName
            }
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(ItemsTemplate);
