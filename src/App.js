import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { Feedback, GamePage, Ranking, Config, Login } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GamePage } />
        <Route exact path="/settings" component={ Config } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
