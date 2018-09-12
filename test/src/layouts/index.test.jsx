/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from '../../../src/layouts/index.jsx';

describe('layout', () => {
  test('Renders', () => {
    const title = 'Hi there';
    const wrapper = shallow(
      <MainLayout title={title}><div /></MainLayout>
    ).dive();
    expect(wrapper).toBeTruthy();
  });
});
