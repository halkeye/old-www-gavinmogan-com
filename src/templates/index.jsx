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
        <section class="card-list">
          {
            postEdges.map(({ node: { childMarkdownRemark: post }}) => {
              return (
                <div className="post-card" key={post.id}>
                  <CoverImage cover={post.frontmatter.cover} />
                  <div>
                    <div className="date">
                      <time datetime={post.frontmatter.date}>{new Intl.DateTimeFormat('en-CA', { dateStyle: 'full', timeStyle: 'long'}).format(Date.parse(post.frontmatter.date))}</time>
                    </div>
                  </div>
                  <h2 className="title"><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h2>
                  <div className="excerpt">{post.excerpt}</div>
                  <Link className="btn" to={post.fields.slug}>Read More</Link>
                </div>
              );
            })
          }
        </section>

        <section id="three">
          <Pagination index={index + 1} pageCount={paginatedPagesCount} />
        </section>
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
