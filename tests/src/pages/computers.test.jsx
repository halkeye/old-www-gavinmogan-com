/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import Computers from '../../../src/pages/computers.jsx';
import { useStaticQuery } from 'gatsby';

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      site: {
        siteMetadata: {
          userDescription: 'foo'
        }
      }
    };
  });
});

jest.mock('../../../src/layouts/Headers.jsx', () => function Headers () { return <div />; });
jest.mock('../../../src/components/ProfileImage/ProfileImage.jsx', () => function ProfileImage () { return <div />; });
jest.mock('../../../src/components/UserDescription/index.jsx', () => function UserDescription () { return <div />; });

describe('computers', () => {
  test('Renders', () => {
    const wrapper = render(<Computers />);
    expect(wrapper).toBeTruthy();
  });
});
