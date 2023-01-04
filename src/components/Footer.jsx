import React from 'react'
import useNavLinks from '../hooks/nav.js';

const Footer = () => {
  const navLinks = useNavLinks()

  return (
  <div id="footer">
    <div className="inner">
      <ul className="icons">
        <li>
          <a href="#" className="icon fa-twitter">
            <span className="label">Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon fa-github">
            <span className="label">Github</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon fa-dribbble">
            <span className="label">Dribbble</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon fa-envelope-o">
            <span className="label">Email</span>
          </a>
        </li>
      </ul>
      <ul>{navLinks.map(({label, to}) => (<li key={`${label}_${to}`}><a role="button" href={to}>{label}</a></li>))}</ul>
      <ul className="copyright">
        <li>&copy; Gatsby Starter Strata</li>
        <li>
          Design: <a href="http://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </div>
  </div>
);
}

export default Footer
