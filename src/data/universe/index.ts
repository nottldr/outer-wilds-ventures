import nodesJson from './nodes';
import { MapNode, Universe } from './types';

const nodes: MapNode[] = nodesJson;

const universe: Universe = { nodes };

// TODO: should we do some validation here, to make sure image paths etc exist? unit test? hmm

export default universe;
