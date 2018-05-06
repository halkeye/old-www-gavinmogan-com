module.exports = {
  blogPostDir: "sample-posts", // The name of directory that contains your posts.
  siteTitle: 'The Nameless Site', // Site title.
  siteTitleAlt: 'The Nameless Site', // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://halkeye.net", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: 'Meow Meow Meow Meow Neow?', // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: null, // FB Application ID for using app insights
  siteGATrackingID: `UA-89920-2`, // Tracking code ID for google analytics.
  disqusShortname: "halkeye-net", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Gavin Mogan", // Username to display in the author segment.
  userTwitter: "halkeye", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Burnaby, BC, Canada", // User location to display in the author segment.
  userAvatar: "https://s.gravatar.com/avatar/498c5ac6ca28f18f1e118c7081255793.png", // User avatar to display in the author segment.
  userDescription:
    "Not sure what to say here yet.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Github",
      url: "https://github.com/halkeye",
      iconClassName: "fa fa-github"
    },
    {
      label: "Salty Stories",
      url: "https://books.saltystories.ca",
      iconClassName: "fa fa-book"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/halkeye",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:website@gavinmogan.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2003. Gavin Mogan" // Copyright string for the footer of the website and RSS feed.
};
