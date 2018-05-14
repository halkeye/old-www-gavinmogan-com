export function toPostInfo(postEdge) {
  return {
    path: postEdge.node.fields.slug,
    tags: postEdge.node.fields.tags,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.frontmatter.date,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead
  };
}

export default {};
