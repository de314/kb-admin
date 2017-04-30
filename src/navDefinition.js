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

export default navDefinition;
