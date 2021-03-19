import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Grid from './components/Grid';
import List from './components/List';

import universe from './data/universe';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/grid">Grid</Link>
            </li>
            {/* <li>
              <Link to="/map">Map</Link>
            </li> */}
          </ul>
        </nav>

        <Switch>
          {/* <Route path="/map">
            <Map nodes={universe.nodes} />
          </Route> */}
          <Route path="/grid">
            <Grid nodes={universe.nodes} />
          </Route>
          <Route path="/">
            <List nodes={universe.nodes} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
