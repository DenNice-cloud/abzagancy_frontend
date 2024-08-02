import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/users" component={MainPage} />
    </Switch>
  </Router>
);

export default App;
