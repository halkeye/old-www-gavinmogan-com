function toPostInfo(node) {
  if (!node) {
    node = {};
  }
  if (!node.frontmatter) {
    node.frontmatter = {};
  }
  if (!node.fields) {
    node.fields = {};
  }

  if (!node.id) {
    throw new Error(`No id provided - ${JSON.stringify(node)}`);
  }

  const ret = {
    id: node.id,
    author: node.frontmatter.author,
    categories: [node.fields.category].filter(Boolean).map(cat => {
      return {
        slug: cat,
        title: cat
      };
    }),
    excerpt: node.excerpt,
    html: node.html,
    htmlAst: node.htmlAst,
    slug: node.fields.slug,
    tags: node.frontmatter.tags || node.fields.tags,
    timeToRead: node.timeToRead,
    title: node.frontmatter.title,
    links: node.frontmatter.links,
    link: node.frontmatter.link,
    attachments: node.frontmatter.attachments
  };

  if (node.frontmatter.date) {
    ret.date = new Date(node.frontmatter.date);
  }
  if (node.frontmatter.cover) {
    ret.cover = node.frontmatter.cover.childImageSharp;
  }
  if (node.frontmatter.image) {
    ret.cover = node.frontmatter.image.childImageSharp;
  }
  return ret;
}

function urlDatePrefix(node) {
  if (node.frontmatter.date) {
    const date = new Date(node.frontmatter.date);
    return `${[date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(v => String(v).padStart(2, '0'))
      .join('/')}`;
  }
  return '';
}

function getDateFromNode(node /* , fileNode */) {
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
