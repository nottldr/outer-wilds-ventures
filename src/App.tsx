import React from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MappyBoi from './components/DetectiveMap/MappyBoi';
import FirstRunModal, {
  Props as FirstRunModalProps,
} from './components/FirstRunModal';
import Grid from './components/Grid';
import Content from './components/layout/Content';
import Sidebar from './components/layout/Sidebar';
import List from './components/List';
import universe from './data/universe';
import { AllMapLayers, MapLayer } from './util/map-layer';

type Props = {
  className?: React.HTMLAttributes<HTMLElement>['className'];
};

enum SidebarState {
  DEFAULT,
  OPEN,
  CLOSED,
}

const DefaultVisibleLayers: MapLayer[] = [
  MapLayer.SUNKEN_MODULE,
  MapLayer.VESSEL,
  MapLayer.QUANTUM_MOON,
  MapLayer.TIME_LOOP,
  MapLayer.OTHER,
];

const DefaultShowLogCounts = true;
const DefaultSpoilerFreeMode = true;

const HasAgreedToPopUpCookiesName = 'has-agreed-to-pop-up';
const SpoilerFreeModeCookieName = 'spoiler-free-mode';
const ShowLogCountsCookieName = 'show-log-counts';
const VisibleLayersCookieName = 'visible-layers';

const cookie2boolean = (s: unknown, defaultValue: boolean): boolean => {
  if (s === 'true') {
    return true;
  }

  if (s === 'false') {
    return false;
  }

  return defaultValue;
};

const boolean2string = (b: boolean): 'true' | 'false' => {
  return b ? 'true' : 'false';
};

const cookie2VisibleLayers = (
  cookieValue: unknown,
  defaultValue: MapLayer[]
): MapLayer[] => {
  if (typeof cookieValue === 'string') {
    const array = cookieValue.split(',').map((v) => parseInt(v, 10));
    const filtered = (array.filter((ml) =>
      AllMapLayers.includes(ml)
    ) as unknown) as MapLayer[];
    return filtered;
  }

  return defaultValue;
};

const visibleLayers2string = (visibleLayers: MapLayer[]): string => {
  return visibleLayers.join(',');
};

const App: React.FC<Props> = ({ className }) => {
  const [cookies, setCookie] = useCookies(['outerwilds-ventures']);

  const [sidebarState, setSidebarState] = React.useState<SidebarState>(
    SidebarState.DEFAULT
  );

  const [showLogCounts, setShowLogCounts] = React.useState<boolean>(
    cookie2boolean(cookies[ShowLogCountsCookieName], DefaultShowLogCounts)
  );

  const [spoilerFreeMode, setSpoilerFreeMode] = React.useState<boolean>(
    cookie2boolean(cookies[SpoilerFreeModeCookieName], DefaultSpoilerFreeMode)
  );

  const [visibleLayers, setVisibleLayers] = React.useState<MapLayer[]>(
    cookie2VisibleLayers(cookies[VisibleLayersCookieName], DefaultVisibleLayers)
  );

  const [hasAgreedToPopUp, setHasAgreedToPopUp] = React.useState<boolean>(
    cookie2boolean(cookies[HasAgreedToPopUpCookiesName], false)
  );

  const [resetAt, setResetAt] = React.useState<number>();

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

  const toggleLayer = React.useCallback(
    (mapLayer: MapLayer) => {
      if (visibleLayers.includes(mapLayer)) {
        setVisibleLayers(visibleLayers.filter((c) => c !== mapLayer));
      } else {
        setVisibleLayers([...visibleLayers, mapLayer]);
      }
    },
    [visibleLayers]
  );

  const toggleShowLogCounts = React.useCallback(() => {
    setShowLogCounts(!showLogCounts);
  }, [showLogCounts]);

  const toggleSpoilerFreeMode = React.useCallback(() => {
    setSpoilerFreeMode(!spoilerFreeMode);
  }, [spoilerFreeMode]);

  React.useEffect(() => {
    setCookie(ShowLogCountsCookieName, boolean2string(showLogCounts), {
      path: '/',
      sameSite: 'lax',
    });
  }, [showLogCounts, setCookie]);

  React.useEffect(() => {
    setCookie(SpoilerFreeModeCookieName, boolean2string(spoilerFreeMode), {
      path: '/',
      sameSite: 'lax',
    });
  }, [spoilerFreeMode, setCookie]);

  React.useEffect(() => {
    setCookie(VisibleLayersCookieName, visibleLayers2string(visibleLayers), {
      path: '/',
      sameSite: 'lax',
    });
  }, [visibleLayers, setCookie]);

  React.useEffect(() => {
    setCookie(HasAgreedToPopUpCookiesName, boolean2string(hasAgreedToPopUp), {
      path: '/',
      sameSite: 'lax',
    });
  }, [hasAgreedToPopUp, setCookie]);

  const reset = React.useCallback(() => {
    setVisibleLayers(DefaultVisibleLayers);
    setShowLogCounts(DefaultShowLogCounts);
    setSpoilerFreeMode(DefaultSpoilerFreeMode);
    setResetAt(new Date().getMilliseconds());
  }, []);

  const agreeToPopUp: FirstRunModalProps['onComplete'] = React.useCallback(
    (agreeMode) => {
      switch (agreeMode) {
        case 'full':
          setSpoilerFreeMode(false);
          setShowLogCounts(true);
          break;
        case 'hide-spoilers':
          setSpoilerFreeMode(true);
          setShowLogCounts(true);
          break;
      }

      setHasAgreedToPopUp(true);
    },
    []
  );

  return (
    <Router>
      <div
        className={`${
          className ?? ''
        } flex flex-col md:flex-row w-full min-h-screen h-full md:h-auto`}
      >
        <div
          className={`flex ${
            isSidebarOpen ? `md:w-80` : `md:w-20`
          } flex-col w-full flex-shrink-0`}
        >
          <Sidebar
            toggleSidebar={toggleSidebar}
            toggleLayer={toggleLayer}
            visibleLayers={visibleLayers}
            toggleShowLogCounts={toggleShowLogCounts}
            showLogCounts={showLogCounts}
            toggleSpoilerFreeMode={toggleSpoilerFreeMode}
            spoilerFreeMode={spoilerFreeMode}
            reset={reset}
            isOpen={isSidebarOpen}
          />
        </div>

        <div
          className="flex flex-col md:flex-1 overflow-scroll scrollbar-off"
          style={{
            minHeight: 400,
          }}
        >
          <Content>
            <Switch>
              <Route path="/list">
                <List nodes={universe.nodes} />
              </Route>
              <Route path="/grid">
                <Grid nodes={universe.nodes} />
              </Route>
              <Route path="/">
                <MappyBoi
                  nodes={universe.nodes}
                  visibleLayers={visibleLayers}
                  showLogCounts={showLogCounts}
                  spoilerFreeMode={spoilerFreeMode}
                  resetAt={resetAt}
                />
              </Route>
            </Switch>
          </Content>
        </div>

        {!hasAgreedToPopUp && <FirstRunModal onComplete={agreeToPopUp} />}
      </div>
    </Router>
  );
};

export default App;
