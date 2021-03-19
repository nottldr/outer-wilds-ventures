import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Grid from './components/Grid';
import List from './components/List';

import universe from './data/universe';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="text-3xl">Outer Wilds Ventures</div>
        <nav>
          <ul>
            <li className="inline-block bg-paper p-2 m-2 rounded-md">
              <Link to="/">List</Link>
            </li>
            <li className="inline-block bg-paper p-2 m-2 rounded-md">
              <Link to="/grid">Grid</Link>
            </li>
            {/* <li className="inline-block bg-paper p-2 m-2 rounded-md">
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
