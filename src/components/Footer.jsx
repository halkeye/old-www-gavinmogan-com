import React from 'react'
import useNavLinks from '../hooks/nav.js';

const Footer = () => {
  const navLinks = useNavLinks()

  return (
    <footer>
      <p/>
      <nav>
        <ul className="nav">{navLinks.map(({label, to}) => (<li key={`${label}_${to}`}><a role="button" href={to}>{label}</a></li>))}</ul>
      </nav>
      <ul className="social">
        <li/>
      </ul>
    </footer>
  );
}

export default Footer
