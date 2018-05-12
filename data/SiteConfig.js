module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  siteTitle: "The Nameless Site", // Site title.
  siteTitleAlt: "The Nameless Site", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://halkeye.net", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "Meow Meow Meow Meow Neow?", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: null, // FB Application ID for using app insights
  siteGATrackingID: `UA-89920-2`, // Tracking code ID for google analytics.
  disqusShortname: "halkeye-net", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Gavin Mogan", // Username to display in the author segment.
  userTwitter: "halkeye", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Burnaby, BC, Canada", // User location to display in the author segment.
  userAvatar:
    "https://s.gravatar.com/avatar/498c5ac6ca28f18f1e118c7081255793.png", // User avatar to display in the author segment.
  userDescription: `
    I'm a software developer at the awesome Sauce Labs.
    I do a bunch of other random open source development.
    I also play games, both board and video games and love to read.
    You can usually find me on various services as halkeye.
  `,
  userLinks: [
    {
      label: "Github",
      url: "https://github.com/halkeye",
      icon: ["fab", "github"]
    },
    {
      label: "Salty Stories",
      url: "https://books.saltystories.ca",
      icon: ["fas", "book"]
    },
    {
      label: "Twitter",
      url: "https://twitter.com/halkeye",
      icon: ["fab", "twitter"]
    },
    {
      label: "Goodreads",
      url: "https://www.goodreads.com/halkeye",
      icon: ["fab", "goodreads"]
    },
    {
      label: "Linked In",
      url: "https://www.linkedin.com/in/halkeye",
      icon: ["fab", "linkedin"]
    },
    {
      label: "Email",
      url: "mailto:website@gavinmogan.com",
      icon: ["fas", "envelope"]
    }
  ],
  copyright: "Copyright © 2003. Gavin Mogan" // Copyright string for the footer of the website and RSS feed.
};
