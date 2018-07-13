import React from 'react';

import './index.scss';

export default function GoodreadsBook ({
  title,
  titleWithoutSeries,
  bookID,
  link,
  imageUrl,
  authors,
  rating
}) {
  const externalLink = `${link}?utm_medium=api&utm_source=custom_widget`;
  const rel = 'external noreferrer noopener nofollow';
  return (
    <div key={bookID} className="goodreads">
      <div
        className="bookImage"
        style={{
          float: 'right',
          overflow: 'hidden',
          height: '60px',
          marginLeft: '4px',
          width: '39px'
        }}
      >
        <a title={title} rel={rel} href={externalLink}>
          <img alt={title} border="0" src={imageUrl} />
        </a>
      </div>
      <div className="rating">
        <span className="staticStars" title="really liked it">
          {Array.from({ length: rating }).map(val => (
            <img
              key={`rating${val}`}
              alt="Rating Star"
              src="https://www.goodreads.com/images/layout/gr_red_star_active.png"
            />
          ))}
        </span>
      </div>
      <div className="title">
        <a rel={rel} href={externalLink}>
          {titleWithoutSeries}
        </a>
      </div>
      <div className="byline">
        {'by '}
        <span className="authors">
          {authors
            .map(author => (
              <a key={author.id} rel={rel} href={author.link}>
                {author.name}
              </a>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        </span>
      </div>
    </div>
  );
}
