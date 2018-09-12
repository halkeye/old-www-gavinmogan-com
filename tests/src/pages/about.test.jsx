/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import About from '../../../src/pages/about.jsx';
// eslint-disable-next-line react/display-name
jest.mock('../../../src/layouts/Headers.jsx', () => () => <div />);
// eslint-disable-next-line react/display-name
jest.mock('../../../src/components/ProfileImage/ProfileImage.jsx', () => () => <div />);

describe('about', () => {
  test('Renders', () => {
    const wrapper = render(<About />);
    expect(wrapper).toBeTruthy();
  });
});
