import React from 'react';
import Universe from './components/Universe';
import universe from './data/universe';

const App: React.FC = () => {
  return (
    <div>
      <div className="text-3xl">Outer Wilds Ventures</div>
      <Universe nodes={universe.nodes} />
    </div>
  );
};

export default App;
