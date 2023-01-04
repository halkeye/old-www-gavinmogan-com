import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import SEO from '../components/SEO/SEO.jsx';
import CoverImage from '../components/CoverImage';


const IndexPage = ({data, pageContext}) => {
    const postEdges = data.allFile.edges;
    const { index, paginatedPagesCount } = pageContext;
    return (
      <Layout>
        <SEO />
        <div id="main">
          <main className="side-main" id="two">
            <h2>Recent Posts</h2>
            <div className="container">
              <section className="post-feed">
              {
                postEdges.map(({ node: { childMarkdownRemark: post }}) => {
                  return (
                    <article key={post.id} className="post-card">
                      <Link to={post.fields.slug}>
                        <header className="post-card-header">
                          <CoverImage className="post-card-image" cover={post.frontmatter.cover} />
                          <h2 className="post-card-title">{post.frontmatter.title}</h2>
                        </header>
                        <section className="post-card-excerpt">
                          {post.excerpt}
                        </section>
                        <footer className="post-card-footer">
                          <div className="post-card-footer-left">
                            {/* If author != me ?
                            <div className="post-card-avatar">
                              <img className="author-profile-image" src="https://static.ghost.org/v2.0.0/images/ghost.png" alt="Ghost">
                            </div>
                            <span>Ghost</span>
                            */}
                          </div>
                          <div className="post-card-footer-right">
                            <div>{post.timeToRead}</div>
                          </div>
                        </footer>
                      </Link>
                    </article>
                  );
                })
              }
              </section>
            </div>
            <pre><xmp>{JSON.stringify(postEdges, null, 4)}</xmp></pre>

            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Full Portfolio
                </a>
              </li>
            </ul>
          </main>

          <section id="three">
            <Pagination index={index + 1} pageCount={paginatedPagesCount} />
          </section>
        </div>
      </Layout>
    );
  }

export default IndexPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allFile(
      filter: {sourceInstanceName: {eq: "blog"}}
      limit: $limit
      skip: $skip
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
    ) {
      edges {
        node {
          childMarkdownRemark {
            id
            excerpt
            timeToRead
            fields {
              slug
            }
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(height: 200, width: 312)
                }
              }
              date
            }
          }
        }
      }
      pageInfo {
        itemCount
        totalCount
        pageCount
        hasNextPage
        currentPage
        hasPreviousPage
        perPage
      }
    }
  }
`;
