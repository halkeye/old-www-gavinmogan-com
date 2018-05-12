import React, { Component } from "react";
import { Card, CardText, Button } from 'react-md';
import Link from "gatsby-link";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import range from 'lodash/range';
import clamp from 'lodash/clamp';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

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
    const angleDoubleLeft = <FontAwesomeIcon size="2x" style={{ margin: 'auto' }} fixedWidth  icon={faAngleDoubleLeft} />;
    const angleDoubleRight = <FontAwesomeIcon size="2x" style={{ margin: 'auto' }} fixedWidth  icon={faAngleDoubleRight} />;
    // flex and center align it
    return (
      <Card raise className="md-grid md-cell md-cell--12">
        <CardText style={{ textAlign: 'center' }}>
          {!pages.includes(1) && <Link to={"".toString()}><Button floating iconEl={angleDoubleLeft} /></Link>}
          {pages.map(page => <PaginationButton key={page} page={page} index={index} />)}
          {!pages.includes(pageCount-1) && <Link to={(pageCount-1).toString()} ><Button floating iconEl={angleDoubleRight} /></Link>}
        </CardText>
      </Card>
    );
  }
}

export default Pagination;
