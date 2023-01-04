import {graphql, useStaticQuery} from "gatsby";

export default function getSocialInfo() {
  const data = useStaticQuery(graphql`
    query SocialInfo {
      site {
        siteMetadata {
          twitter: userTwitter
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
