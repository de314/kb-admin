import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import collections from './collections/index';
import kb from 'kb-ui';

import { Link } from 'react-router-dom';

// Containers
import Full from './containers/Full/'
import Simple from './containers/Simple/'

import Charts from './views/Charts/'
import Dashboard from './views/Dashboard/'
import Buttons from './views/Components/Buttons/'
import Cards from './views/Components/Cards/'
import Forms from './views/Components/Forms/'
import Modals from './views/Components/Modals/'
import SocialButtons from './views/Components/SocialButtons/'
import Switches from './views/Components/Switches/'
import Tables from './views/Components/Tables/'
import Tabs from './views/Components/Tabs/'
import FontAwesome from './views/Icons/FontAwesome/'
import SimpleLineIcons from './views/Icons/SimpleLineIcons/'
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import Widgets from './views/Widgets/'
import Settings from './views/Settings/Settings'
import Users from './views/Users/Users'

function NavTitle(text) {
  this.text = text;
  this.sidebar = true;
}

function NavDivider() {
  this.sidebar = true;
}

function RouteDefinition(text, route, component, container) {
  this.text = text;
  this.route = route;
  this.component = component;
  this.container = container;
}

RouteDefinition.prototype.addToSidebar = function() {
  this.sidebar = true;
  return this;
}

RouteDefinition.prototype.addToHeader = function() {
  this.header = true;
  return this;
}

RouteDefinition.prototype.withBadge = function(badge) {
  this.badge = badge;
  return this;
}

RouteDefinition.prototype.withIcon = function(iconClass) {
  this.iconClass = iconClass;
  return this;
}

function RouteContainerDefinition(text, route, subRoutes) {
  this.text = text;
  this.route = route;
  this.subRoutes = subRoutes;
}

RouteContainerDefinition.prototype.withBadge = function(badge) {
  this.badge = badge;
  return this;
}

RouteContainerDefinition.prototype.withIcon = function(iconClass) {
  this.iconClass = iconClass;
  return this;
}

RouteContainerDefinition.prototype.addToSidebar = function() {
  this.sidebar = true;
  return this;
}



function getInternalRoute(text, route, component, container) {
  return { text, route, internalRoute: true, component, container };
}

function getNavContainer(text, route, iconClass, subRoutes) {
  return { text, route, iconClass, subRoutes };
}

function getWrappedNavRoute(text, route, component, container, iconClass, headerLink, badge) {
  return { text, route, component, container, iconClass, headerLink, badge };
}

const navDefinition = {
  notFound: getWrappedNavRoute('Error 404', '/pages/404', Page404, Simple, 'icon-star'),
  routes: [
    new RouteDefinition('Dashboard', '/', Dashboard, Full),
    new RouteDefinition('Dashboard', '/dashboard', Dashboard, Full)
        .withIcon('icon-speedometer')
        .withBadge({ text: 'NEW', type: 'info' })
        .addToSidebar()
        .addToHeader(),
    new NavTitle('UI Elements'),
    new RouteContainerDefinition('Components', '/components', [
          new RouteDefinition('Buttons', '/components/buttons', Buttons, Full).withIcon('icon-puzzle').addToSidebar(),
          new RouteDefinition('Social Buttons', '/components/social-buttons', SocialButtons, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Cards', '/components/cards', Cards, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Forms', '/components/forms', Forms, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Modals', '/components/modals', Modals, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Switches', '/components/switches', Switches, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Tables', '/components/tables', Tables, Full).withIcon( 'icon-puzzle').addToSidebar(),
          new RouteDefinition('Tabs', '/components/tabs', Tabs, Full).withIcon( 'icon-puzzle').addToSidebar(),
        ])
        .withIcon('icon-puzzle')
        .addToSidebar(),
    new RouteContainerDefinition('Icons', '/icons', [
          new RouteDefinition('Font Awesome', '/icons/font-awesome', FontAwesome, Full).withIcon('icon-star').addToSidebar(),
          new RouteDefinition('Simple Line Icons', '/icons/simple-line-icons', SimpleLineIcons, Full).withIcon('icon-star').addToSidebar(),
        ])
        .withIcon('icon-star')
        .addToSidebar(),
    new RouteDefinition('Widgets ', '/widgets', Widgets, Full)
        .withIcon('icon-calculator')
        .withBadge({ text: 'NEW', type: 'warning' })
        .addToSidebar(),
    new RouteDefinition('Charts', '/charts', Charts, Full)
        .withIcon('icon-pie-chart')
        .addToSidebar(),
    new NavDivider(),
    new NavTitle('Extras'),
    new RouteContainerDefinition('Pages', '/pages', [
          new RouteDefinition('Login', '/pages/login', Login, Simple).withIcon('icon-star').addToSidebar(),
          new RouteDefinition('Register', '/pages/register', Register, Simple).withIcon('icon-star').addToSidebar(),
          new RouteDefinition('Error 404', '/pages/404', Page404, Simple).withIcon('icon-star').addToSidebar(),
          new RouteDefinition('Error 500', '/pages/500', Page500, Simple).withIcon('icon-star').addToSidebar(),
        ])
        .withIcon('icon-star')
        .addToSidebar(),
    new RouteDefinition('Users', '/users', Users, Full).addToHeader(),
    new RouteDefinition('Settings', '/settings', Users, Full).addToHeader()
  ]
}

const ViewWrapper = ({ id, title, view, onSubmit, wrapperProps }) => {
  console.log({id, title, view, wrapperProps});
  return (
    <div className="ViewWrapper">
      <div className="card">
        <div className="card-header">
          {title}
        </div>
        <div className="card-block">
          {view._render(id, onSubmit)}
        </div>
      </div>
    </div>
  );
}

ViewWrapper.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  title: PropTypes.string.isRequired,
  view: PropTypes.object.isRequired,
  wrapperProps: PropTypes.object.isRequired,
}

function appendListCtas(list, ctas) {
  if (ctas.length > 0) {
    list.options.fields.push(
      kb.field('id').label('Actions').render((id) => ctas.map(({ href = '#', onClick = () => {}, text }, i) => (
        <Link
          className="btn btn-sm btn-secondary"
          to={_.isFunction(href) ? href(id) : href }
          onClick={e => onClick(id)}
          key={i}
        >
          {text}
        </Link>
      )))
    );
  }
}

function appendCollectionRoutes(key, collection, navDefinition) {
  const { options } = collection,
      { list, details, create, edit, singular, plural, slug } = options,
      { routes } = navDefinition,
      slugs = {
        list: `/${slug}/list`,
        create: `/${slug}/create`,
        details: (id) => `/${slug}/details/${id}`,
        edit: (id) => `/${slug}/edit/${id}`,
      },
      ctas = [];
  if (!_.isUndefined(details)) {
    routes.push(new RouteDefinition(
          `Create ${singular}`,
          slugs.details(':id'),
          (props) => (<ViewWrapper wrapperProps={props} title={`${singular}`} view={details} id={props.match.params.id} />),
          Full
        )
    );
    ctas.push({ text: "View", href: (id) => slugs.details(id) });
  }
  if (!_.isUndefined(edit)) {
    routes.push(new RouteDefinition(
          `Edit ${singular}`,
          slugs.edit(':id'),
          (props) => (<ViewWrapper wrapperProps={props} title={`${singular}`} view={edit} id={props.match.params.id} onSubmit={() => props.history.push(slugs.list)} />),
          Full
        )
    );
    ctas.push({ text: "Edit", href: (id) => slugs.edit(id) });
  }
  if (!_.isUndefined(list) || !_.isUndefined(create)) {
    const subRoutes = [];
    if (!_.isUndefined(list)) {
      appendListCtas(list, ctas);
      subRoutes.push(new RouteDefinition(
            `All ${plural}`,
            slugs.list,
            (props) => (<ViewWrapper wrapperProps={props} title={`All ${plural}`} view={list} />),
            Full
          )
          .withIcon('fa fa-list')
          .addToSidebar()
        )
    }
    if (!_.isUndefined(create)) {
      subRoutes.push(new RouteDefinition(
            `Create ${singular}`,
            slugs.create,
            (props) => (<ViewWrapper wrapperProps={props} title={`All ${plural}`} view={create} onSubmit={() => props.history.push(slugs.list)} />),
            Full
          )
          .withIcon('fa fa-plus')
          .addToSidebar()
      )
    }
    routes.push(new RouteContainerDefinition(plural, `/${slug}`, subRoutes).addToSidebar())
  }
  console.log({key, list, details, create, edit});
}

_.map(collections, (collection, key) => appendCollectionRoutes(key, collection, navDefinition));

export default navDefinition;
