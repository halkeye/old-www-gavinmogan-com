export function toPostInfo (postEdge) {
  const ret = {
    author: postEdge?.node?.author,
    cover: postEdge?.node?.cover,
    categories: postEdge?.node?.category,
    date: new Date(postEdge?.node?.date),
    excerpt: postEdge?.node?.content?.childMarkdownRemark?.excerpt,
    html: postEdge?.node?.content?.childMarkdownRemark?.html,
    htmlAst: postEdge?.node?.content?.childMarkdownRemark?.htmlAst,
    path: postEdge?.node?.fields?.url,
    tags: postEdge?.node?.tags,
    timeToRead: postEdge?.node?.content?.childMarkdownRemark?.timeToRead,
    title: postEdge?.node?.title
  };
  return ret;
}

export default {};
