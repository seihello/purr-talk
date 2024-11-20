import Progress from "../enum/progress.enum";

type WordInfo = {
  id: number;
  categoryIds: number[];
  phaseIds: number[];
  progress: Progress;
};

export default WordInfo;