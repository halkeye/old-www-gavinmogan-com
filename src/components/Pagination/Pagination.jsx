import React, { Component } from "react";
import { Card, CardText, Button } from 'react-md';
import Link from "gatsby-link";
import range from 'lodash/range';
import clamp from 'lodash/clamp';

function PaginationButton({page, index}) {
  const url = page === 1 ? "" : page.toString();
  return (
    <Link to={url}>
      <Button floating secondary={index === page} iconEl={<div>{page}</div>}>{page}</Button>
    </Link>
  );
}

class Pagination extends Component {
  render() {
    const { index, pageCount } = this.props;
    const pages = range(clamp(index-5, 1, pageCount), clamp(index+10, pageCount)).slice(0, 10)
    // flex and center align it
    return (
      <Card raise className="md-grid md-cell md-cell--12">
        <CardText>
          <div className="md-grid">
            {!pages.includes(1) && <span className="md-cell md-cell--1"><PaginationButton page={1} index={index} />...</span>}
            {pages.map(page => <span key={page} className="md-cell md-cell--1"><PaginationButton page={page} index={index} /></span>)}
            {!pages.includes(pageCount-1) && <span className="md-cell md-cell--1">...<PaginationButton page={pageCount-1} index={index} /></span>}
          </div>
        </CardText>
      </Card>
    );
  }
}

export default Pagination;

