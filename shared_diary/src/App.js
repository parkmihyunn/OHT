import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
import Page from './page';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
            <Route exact path="https://oht-3.netlify.app/" component={Home} />
            <Route exact path="https://oht-3.netlify.app/page" component={Page} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;