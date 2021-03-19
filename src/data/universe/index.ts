type Log = string;
type NodeID = string;

enum PlanetColour {
  Purple,
  Green,
  Brown,
  Grey,
  Red,
}

type Coordinate = {
  x: number;
  y: number;
};

type Node = {
  id: NodeID;
  name: string;
  colour: PlanetColour;
  logs: Log[];
  connections: NodeID[];
  location: Coordinate;
};

type Universe = {
  planets: Node[];
};

const universe: Universe = {};

export default universe;
