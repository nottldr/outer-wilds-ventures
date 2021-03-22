import shipLogs from '../assets/entries.json';

type AstroObjectEntryExploreFact = {
  id: string;
  text: string;
};

type AstroObjectEntryRumourFact = {
  id: string;
  text: string;
  sourceId?: string;
};

type AstroObjectEntry = {
  id: string;
  parentId?: string;

  name: string;
  curiousity?: string;
  isCuriousity: boolean;

  altPhotoCondition?: string;

  facts: {
    explore: AstroObjectEntryExploreFact[];
    rumor: AstroObjectEntryRumourFact[];
  };
};

export type ShipLog = {
  id: string;
  entries: AstroObjectEntry[];
};

export default shipLogs as ShipLog[];
