import Progress from "../enum/progress.enum";

type Word = {
  id: number;
  title: string;
  meaning: string;
  sentences: string[];
  ipa: string;
  parts: string[];
  synonyms: string[];
  progress: Progress;
};

export default Word;
