import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

const NavItem = ({ badge, children, iconClass, to  }) => {
  return (
    <li className="NavItem nav-item">
      <NavLink to={to} className="nav-link" activeClassName="active">
        { _.isUndefined(iconClass) ? '' : (<i className={iconClass}></i>) }
        { children }
        { _.isUndefined(badge) ? '' : badge }
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  badge: PropTypes.node,
  iconClass: PropTypes.string,
  to: PropTypes.string.isRequired
}

export default NavItem
