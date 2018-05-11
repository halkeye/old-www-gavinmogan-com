import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class IndexPage extends React.Component {
  render() {
    const { pathContext } = this.props;
    const { group, index, pageCount } = pathContext;
    return (
      <div className="index-container">
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <SEO postEdges={group} />
        <PostListing postEdges={group} />
        <Pagination index={index} pageCount={pageCount} />
      </div>
    );
  }
}

export default IndexPage;
