/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import About from '../../../src/pages/about.jsx';
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
jest.mock('../../../src/components/ProfileImage/ProfileImageLarge.jsx', () => function ProfileImageLarge () { return <div />; });

describe('about', () => {
  test('Renders', () => {
    const wrapper = render(<About />);
    expect(wrapper).toBeTruthy();
  });
});
