import React from 'react';
import Universe from './components/Universe';
import universe from './data/universe';

const App: React.FC = () => {
  return (
    <div>
      <div className="bg-yellow-500">Outer Worlds Ventures</div>
      <Universe nodes={universe.nodes} />
    </div>
  );
};

export default App;
