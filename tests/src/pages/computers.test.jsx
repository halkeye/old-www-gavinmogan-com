/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import Computers from '../../../src/pages/computers.jsx';
// eslint-disable-next-line react/display-name
jest.mock('../../../src/layouts/Headers.jsx', () => () => <div />);
// eslint-disable-next-line react/display-name
jest.mock('../../../src/components/ProfileImage/ProfileImage.jsx', () => () => <div />);

describe('computers', () => {
  test('Renders', () => {
    const wrapper = render(<Computers />);
    expect(wrapper).toBeTruthy();
  });
});
