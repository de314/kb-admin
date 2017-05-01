import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

import 'kb-ui/styles/base.css';

import navDefinition from './navDefinition';


ReactDOM.render(
  <Router navDefinition={navDefinition} />, document.getElementById('root')
);
