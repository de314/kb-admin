import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

import navDefinition from './navDefinition';

ReactDOM.render(
  <Router navDefinition={navDefinition} />, document.getElementById('root')
);
