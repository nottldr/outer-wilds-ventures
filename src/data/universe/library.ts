import library from '../assets/library.json';

type Library = {
  defaultSpritePath: string;
  entries: {
    id: string;
    spritePath: string;
    altSpritePath?: string;
    cardPosition: {
      x: number;
      y: number;
    };
  }[];
};

export default library as Library;
