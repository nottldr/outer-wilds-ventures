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

enum SidebarState {
  DEFAULT,
  OPEN,
  CLOSED,
}

const App: React.FC<Props> = ({ className }) => {
  const [sidebarState, setSidebarState] = React.useState<SidebarState>(
    SidebarState.DEFAULT
  );

  const isSidebarOpen = (() => {
    if (sidebarState === SidebarState.DEFAULT) {
      // XXX: check viewport size, and decide? defaulting to open for now...
      return true;
    }

    return sidebarState === SidebarState.OPEN;
  })();

  const toggleSidebar = React.useCallback(() => {
    setSidebarState(isSidebarOpen ? SidebarState.CLOSED : SidebarState.OPEN);
  }, [isSidebarOpen]);

  return (
    <Router>
      <div
        className={`${className} md:flex flex-col md:flex-row md:h-screen w-full`}
      >
        <div
          className={`flex ${
            isSidebarOpen ? `md:w-80` : `md:w-20`
          } flex-col w-full flex-shrink-0`}
        >
          <Sidebar toggle={toggleSidebar} isOpen={isSidebarOpen} />
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
