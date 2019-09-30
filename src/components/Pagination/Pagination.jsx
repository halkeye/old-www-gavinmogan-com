import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Card, CardText } from 'react-md/lib';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import range from 'lodash/range';
import clamp from 'lodash/clamp';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight';

import './style.scss';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function PaginationButton ({ page, index }) {
  const classes = useStyles();
  const url = page === 1 ? '' : page.toString();
  return (
    <Link to={'/' + url}>
      <Fab
        title={`Go to page${page}`}
        aria-label={`Go to page${page}`}
        className={classes.fab}
        color={index === page ? 'secondary' : 'primary'}
      >
        {page}
      </Fab>
    </Link>
  );
}
const angleDoubleLeft = (
  <FontAwesomeIcon
    size="2x"
    style={{ margin: 'auto' }}
    fixedWidth
    icon={faAngleDoubleLeft}
  />
);
const angleDoubleRight = (
  <FontAwesomeIcon
    size="2x"
    style={{ margin: 'auto' }}
    fixedWidth
    icon={faAngleDoubleRight}
  />
);

function Pagination ({ index, pageCount }) {
  const classes = useStyles();
  const pages = range(
    clamp(index - 5, 1, pageCount),
    clamp(index + 9, pageCount)
  ).slice(0, 10);
  // flex and center align it
  return (
    <Card raise className="md-grid md-cell md-cell--12 card-pagination">
      <CardText style={{ textAlign: 'center' }}>
        {!pages.includes(1) && (
          <Link to={''.toString()}>
            <Fab
              title="Go to first page"
              aria-label="Go to first page"
              color="primary"
              className={classes.fab}
            >
              {angleDoubleLeft}
            </Fab>
          </Link>
        )}
        {pages.map(page => (
          <PaginationButton key={page} page={page} index={index} />
        ))}
        {!pages.includes(pageCount - 1) && (
          <Link to={'/' + (pageCount - 1).toString()}>
            <Fab
              title="Go to last page"
              aria-label="Go to last page"
              color="primary"
              className={classes.fab}
            >
              {angleDoubleRight}
            </Fab>
          </Link>
        )}
      </CardText>
    </Card>
  );
}

export default Pagination;
