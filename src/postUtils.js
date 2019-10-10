function toPostInfo (postEdge) {
  if (!postEdge) {
    postEdge = {};
  }
  if (!postEdge.node) {
    postEdge.node = {};
  }
  if (!postEdge.node.frontmatter) {
    postEdge.node.frontmatter = {};
  }
  if (!postEdge.node.fields) {
    postEdge.node.fields = {};
  }

  if (!postEdge.node.id) {
    throw new Error(`No id provided - ${JSON.stringify(postEdge.node)}`);
  }

  const ret = {
    id: postEdge.node.id,
    author: postEdge.node.frontmatter.author,
    categories: [postEdge.node.fields.category].filter(Boolean).map(cat => {
      return {
        slug: cat,
        title: cat
      };
    }),
    excerpt: postEdge.node.excerpt,
    html: postEdge.node.html,
    htmlAst: postEdge.node.htmlAst,
    slug: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags || postEdge.node.fields.tags,
    timeToRead: postEdge.node.timeToRead,
    title: postEdge.node.frontmatter.title,
    links: postEdge.node.frontmatter.links,
    link: postEdge.node.frontmatter.link,
    attachments: postEdge.node.frontmatter.attachments
  };

  if (postEdge.node.frontmatter.date) {
    ret.date = new Date(postEdge.node.frontmatter.date);
  }
  if (postEdge.node.frontmatter.cover) {
    ret.cover = postEdge.node.frontmatter.cover.childImageSharp;
  }
  if (postEdge.node.frontmatter.image) {
    ret.cover = postEdge.node.frontmatter.image.childImageSharp;
  }
  return ret;
}

function urlDatePrefix (node) {
  if (node.frontmatter.date) {
    const date = new Date(node.frontmatter.date);
    return `${[date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(v => String(v).padStart(2, '0'))
      .join('/')}`;
  }
  return '';
}

function getDateFromNode (node /* , fileNode */) {
  const date = (node.frontmatter || {}).date || '';
  if (date) {
    return new Date(date).toISOString();
  }
  return date;
}

module.exports = {
  getDateFromNode,
  urlDatePrefix,
  toPostInfo
};
