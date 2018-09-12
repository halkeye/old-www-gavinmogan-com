/* eslint-env jest */
import GetNavList from '../../../../src/components/Navigation/NavList.jsx';

describe.skip('GetNavList', () => {
  test('returns thing', () => {
    const navList = GetNavList({});
    expect(navList).toEqual([
    ]);
  });
});
