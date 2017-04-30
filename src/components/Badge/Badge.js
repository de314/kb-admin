import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ type = 'info' , children }) => {
  return (
    <span className={`badge badge-${type}`}>
      { children }
    </span>
  );
}

Badge.propTypes = {
  type: PropTypes.string
}

export default Badge
