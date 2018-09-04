const fabGithub = require('@fortawesome/fontawesome-free-brands/faGithub');
const fabTwitter = require('@fortawesome/fontawesome-free-brands/faTwitter');
const fabGoodreads = require('@fortawesome/fontawesome-free-brands/faGoodreads');
const fabLinkedin = require('@fortawesome/fontawesome-free-brands/faLinkedin');
const fabSteam = require('@fortawesome/fontawesome-free-brands/faSteam');
const fasBook = require('@fortawesome/fontawesome-free-solid/faBook');
const fasEnvelope = require('@fortawesome/fontawesome-free-solid/faEnvelope');

module.exports = {
  siteTitle: 'The Nameless Site', // Site title.
  siteTitleAlt: 'The Nameless Site', // Alternative site title for SEO.
  siteLogo: '/logos/logo-1024.png', // Logo used for SEO and manifest.
  siteUrl: 'https://www.gavinmogan.com', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: 'Meow Meow Meow Meow Neow?', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteFBAppID: null, // FB Application ID for using app insights
  disqusShortname: 'halkeye-net', // Disqus shortname.
  disqusUrl: 'https://halkeye.net', // Domain of your website without pathPrefix.
  postDefaultCategoryID: 'Tech', // Default category for posts.
  userName: 'Gavin Mogan', // Username to display in the author segment.
  userTwitter: 'halkeye', // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: 'Burnaby, BC, Canada', // User location to display in the author segment.
  userAvatar:
    'https://s.gravatar.com/avatar/498c5ac6ca28f18f1e118c7081255793.png', // User avatar to display in the author segment.
  userDescription: `
    I'm a software developer at the awesome Sauce Labs.
    I do a bunch of other random open source development.
    I also play games, both board and video games and love to read.
    You can usually find me on various services as halkeye.
  `,
  userLinks: [
    {
      label: 'Github',
      url: 'https://github.com/halkeye',
      icon: fabGithub
    },
    {
      label: 'Salty Stories',
      url: 'https://books.saltystories.ca',
      icon: fasBook
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/halkeye',
      icon: fabTwitter
    },
    {
      label: 'Goodreads',
      url: 'https://www.goodreads.com/halkeye',
      icon: fabGoodreads
    },
    {
      label: 'Linked In',
      url: 'https://www.linkedin.com/in/halkeye',
      icon: fabLinkedin
    },
    {
      label: 'Steam',
      url: 'https://steamcommunity.com/id/halkeye',
      icon: fabSteam
    },
    {
      label: 'Email',
      url: 'mailto:website@gavinmogan.com',
      icon: fasEnvelope
    }
  ],
  copyright: 'Copyright © 2003. Gavin Mogan' // Copyright string for the footer of the website and RSS feed.
};
