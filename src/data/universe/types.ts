type Log = string;
type NodeID = string;

export enum PlanetColour {
  PURRLE,
  GREEN,
  BROWN,
  GREY,
  RED,
}

type Coordinate = {
  x: number;
  y: number;
};

export type MapNode = {
  id: NodeID;
  name: string;
  image: string;
  colour: PlanetColour;
  logs: Log[];
  connections: NodeID[];
  location: Coordinate;
};

export type Universe = {
  nodes: MapNode[];
};
