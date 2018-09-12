/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from '../../../src/layouts/index.jsx';
// eslint-disable-next-line react/display-name
jest.mock('../../../src/layouts/Headers.jsx', () => () => <div />);
// eslint-disable-next-line react/display-name
jest.mock('../../../src/components/ProfileImage/ProfileImage.jsx', () => () => <div />);

describe('layout', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <MainLayout title="hi there"><div /></MainLayout>
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('Navigation').props()).toMatchObject({ LocalTitle: 'hi there' });
  });
});
