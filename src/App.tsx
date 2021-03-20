import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Grid from './components/Grid';
import List from './components/List';
import MappyBoi from './components/MappyBoi';
import universe from './data/universe';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="text-3xl">Outer Wilds Ventures</div>
        <nav>
          <div className="inline-block bg-paper p-2 m-2 rounded-md">
            <NavLink to="/" activeClassName="font-bold" exact>
              Map
            </NavLink>
          </div>
          <div className="inline-block bg-paper p-2 m-2 rounded-md">
            <NavLink to="/grid" activeClassName="font-bold" exact>
              Grid
            </NavLink>
          </div>
          <div className="inline-block bg-paper p-2 m-2 rounded-md">
            <NavLink to="/list" activeClassName="font-bold" exact>
              List
            </NavLink>
          </div>
        </nav>

        <Switch>
          <Route path="/list">
            <List nodes={universe.nodes} />
          </Route>
          <Route path="/grid">
            <Grid nodes={universe.nodes} />
          </Route>
          <Route path="/">
            <MappyBoi nodes={universe.nodes} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
