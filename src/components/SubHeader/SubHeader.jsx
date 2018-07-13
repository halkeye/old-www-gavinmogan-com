import React from 'react';
import { Card, CardTitle } from 'react-md';

import './subheader.scss';

export default function SubHeader ({ title }) {
  return (
    <Card className="md-grid md-cell md-cell--12 sub-header">
      <CardTitle title={title} className="page-title" />
    </Card>
  );
}
