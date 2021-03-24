import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Grid from './components/Grid';
import Content from './components/layout/Content';
import Sidebar from './components/layout/Sidebar';
import List from './components/List';
import MappyBoi from './components/MappyBoi';
import universe from './data/universe';

type Props = {
  className?: React.HTMLAttributes<HTMLElement>['className'];
};

const App: React.FC<Props> = ({ className }) => {
  return (
    <Router>
      <div
        className={`${className} md:flex flex-col md:flex-row md:h-screen w-full`}
      >
        <div className="flex flex-col w-full md:w-80 flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 overflow-scroll scrollbar-off">
          <Content>
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
          </Content>
        </div>
      </div>
    </Router>
  );
};

export default App;
