import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fasCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import fasFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';

const Avatar = ({ children }) => <div>FIXME, {children}</div>
const CardHeader = ({ children }) => <div>FIXME, {children}</div>
const Grid = ({ children }) => <div>FIXME, {children}</div>

function PostInfo ({ postNode }) {
  return (
    <Grid container justify="space-between" direction="row">
      <Grid item>
        <CardHeader
          avatar={<Avatar><FontAwesomeIcon icon={fasCalendar} className="md-icon" /></Avatar>}
          title={`Published on ${postNode.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}`}
          subheader={`${postNode.timeToRead} min read`}
        />
      </Grid>
      <Grid item>
        {postNode.categories.map(category => (
          <Link key={category.slug} to={`/categories/${kebabCase(category.slug)}`}>
            <CardHeader
              avatar={<Avatar><FontAwesomeIcon icon={fasFolderOpen} className="md-icon" /></Avatar>}
              title="In category"
              subheader={category.title}
            />
          </Link>
        ))}
      </Grid>
    </Grid>
  );
}

export default PostInfo;
