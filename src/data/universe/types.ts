type Log = string;
type NodeID = string;

export enum Curiosity {
  SUNKEN_MODULE,
  VESSEL,
  COMET_CORE,
  QUANTUM_MOON,
  TIME_LOOP,
  INVISIBLE_PLANET,
}

export enum PlanetColour {
  PURPLE,
  GREEN,
  ORANGE,
  GREY,
  RED,
  BLUE,
}

export enum MapNodeSize {
  XSMALL,
  SMALL,
  MEDIUM,
  LARGE,
}

type Coordinate = {
  x: number;
  y: number;
};

type MapNodeConnection = {
  id: NodeID;
  sourceId: NodeID;
  text: string;
};

export type MapNode = {
  id: NodeID;
  name: string;
  image: string;
  curiosity?: Curiosity;
  sizeClass: MapNodeSize;
  logs: Log[];
  connections: MapNodeConnection[];
  location: Coordinate;
};

export type Connection = {
  from: MapNode;
  to: MapNode;
};

export type Universe = {
  nodes: MapNode[];
};
