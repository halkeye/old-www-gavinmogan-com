import React from 'react'

import UserDescription from '../components/UserDescription';
import ProfileImage from '../components/ProfileImage/ProfileImage'

const Sidebar = () => {
  return (
    <aside>
      <ProfileImage />
      <h1>Gavin Mogan</h1>
      <UserDescription />
      <h2>Friends Sites</h2>
      <ul>
        <li>
          <a rel="friend" href="https://forgreatjustice.ca/">
            For Great Justice
          </a>{' '}
          (Nigel)
        </li>
      </ul>
      <h2>Federverse</h2>
      <ul>
        <li><a rel="me" href="https://toot.cafe/@halkeye">Mastodon</a></li>
        <li><a rel="me" href="https://matrix.to/#/@halkeye:g4v.dev">Matrix</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
