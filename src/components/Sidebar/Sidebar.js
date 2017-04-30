import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';

import Badge from '../Badge/Badge';
import NavItem from './NavItem';
import NavTitle from './NavTitle';
import NavItemContainer from './NavItemContainer';

function getBadge({text, type}) {
  return (
    <Badge type={type}>{text}</Badge>
  )
}

function getNavTitle({ text }, i) {
  return (
    <NavTitle key={i}>
      { text }
    </NavTitle>
  )
}

function getNavItem({ text, iconClass, route, badge = {} }, i) {
  badge = !_.isUndefined(badge.text) ? getBadge(badge) : undefined;
  return (
    <NavItem iconClass={iconClass} to={route} badge={badge} key={i}>
      { text }
    </NavItem>
  )
}

function getNavItemContainer({ text, iconClass, badge = {}, route, subRoutes }, i) {
  const active = window.location.href.indexOf(route) >= 0;
  badge = !_.isUndefined(badge.text) ? getBadge(badge) : undefined;
  return (
    <NavItemContainer active={active} badge={badge} iconClass={iconClass} text={text} key={i}>
      { subRoutes.map(getNavElement) }
    </NavItemContainer>
  )
}

function getNavElement(def, i) {
  if (def.sidebar !== true) {
    return '';
  }
  if (_.isArray(def.subRoutes)) {
    return getNavItemContainer(def, i);
  }
  if (!_.isUndefined(def.route)) {
    return getNavItem(def, i);
  }
  if (!_.isUndefined(def.text)) {
    return getNavTitle(def, i);
  }
  return (<li className="divider" key={i}></li>);
}

const Sidebar = ({ navDefinition }) => {
  const navItems = navDefinition.routes;
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          { navItems.map(getNavElement) }
        </ul>
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  navDefinition: PropTypes.object.isRequired
}

export default Sidebar;
