import React from 'react';

const Card = ({ children }) => <div>FIXME, {children}</div>
const CardTitle = ({ children }) => <div>FIXME, {children}</div>

import './subheader.scss';

export default function SubHeader ({ title }) {
  return (
    <Card className="md-grid md-cell md-cell--12 sub-header">
      <CardTitle title={title} className="page-title" />
    </Card>
  );
}
