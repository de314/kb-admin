import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const NavTitle = ({ badge, children }) => {
  return (
    <li className="NavTitle nav-title">
      { children }
      { _.isUndefined(badge) ? '' : badge }
    </li>
  );
}

NavTitle.propTypes = {
  badge: PropTypes.node
}

export default NavTitle
