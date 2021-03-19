import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Grid from './components/Grid';
import List from './components/List';
import universe from './data/universe';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="text-3xl">Outer Wilds Ventures</div>
        <nav>
          <div className="inline-block bg-paper p-2 m-2 rounded-md">
            <NavLink to="/" activeClassName="font-bold" exact>
              List
            </NavLink>
          </div>
          <div className="inline-block bg-paper p-2 m-2 rounded-md">
            <NavLink to="/grid" activeClassName="font-bold" exact>
              Grid
            </NavLink>
          </div>
          {/* <div className="inline-block bg-paper p-2 m-2 rounded-md">
              <NavLink to="/map">Map</NavLink>
            </div> */}
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
