import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import collections from './collections';

const RouteWrapper = ({ component: Component, container: Container, ...rest }) => {
  return (
    <div className="RouteWrapper">
      <Container {...rest}>
        <Component {...rest} />
      </Container>
    </div>
  );
}

function getRoute(ele, navDefinition) {
  const { route, subRoutes, text, container : Container, component : Component } = ele;
  if (_.isArray(subRoutes)) {
    return subRoutes.map(subRoute => getRoute(subRoute, navDefinition));
  }
  if (_.isUndefined(Component)) {
    return '';
  }
  if (!_.isUndefined(Container)) {
    return (
      <Route exact path={route} name={text} render={(props) => (<RouteWrapper navDefinition={navDefinition} {...ele} {...props} />)} key={ele.route} />
    );
  }
  return (
    <Route exact path={route} name={text} render={(props) => (<Component navDefinition={navDefinition} {...props} />)} key={ele.route} />
  )
}

function getCatchAllRoute(ele, navDefinition) {
  const { container : Container, component : Component } = ele;
  if (_.isUndefined(Component)) {
    return '';
  }
  if (!_.isUndefined(Container)) {
    return (
      <Route render={(props) => (<RouteWrapper navDefinition={navDefinition} {...props} />)} />
    );
  }
  return (
    <Route component={Component} navDefinition={navDefinition} />
  )
}

const Routes = ({ navDefinition }) => {
  return (
    <div className="FullRoutes">
      <Router>
        <Switch>
          {navDefinition.routes.map(ele => getRoute(ele, navDefinition))}
          {getCatchAllRoute(navDefinition.notFound)}
        </Switch>
      </Router>
    </div>
  );
}

Routes.propTypes = {
  navDefinition: PropTypes.object.isRequired
}

export default Routes;
