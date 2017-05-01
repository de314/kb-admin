import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

const NavItemContainer = ({ active = false, badge, children, iconClass, text }) => {
  function handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }
  return (
    <li className={`NavItemContainer nav-item nav-dropdown ${active ? 'open' : ''}`}>
      <a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick}>
        { _.isUndefined(iconClass) ? '' : (<i className={iconClass}></i>)}
        { text }
        { _.isUndefined(badge) ? '' : badge }
      </a>
      <ul className="nav-dropdown-items">
        { children }
      </ul>
    </li>
  );
}

NavItemContainer.propTypes = {
  active: PropTypes.bool,
  badge: PropTypes.node,
  iconClass: PropTypes.string,
  text: PropTypes.node.isRequired
}

export default NavItemContainer
