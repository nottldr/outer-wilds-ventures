type Log = string;
type NodeID = string;

export enum PlanetColour {
  PURRLE,
  GREEN,
  ORANGE,
  GREY,
  RED,
}

export enum MapNodeSize {
  SMALL,
  MEDIUM,
  LARGE,
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
  size: MapNodeSize;
  logs: Log[];
  connections: NodeID[];
  location: Coordinate;
};

export type Universe = {
  nodes: MapNode[];
};
