import Progress from "../../enum/progress.enum";
import storage from "../local-storage";

export default async function updateWordProgress(
  wordId: number,
  progress: Progress,
) {
  await storage.save({
    key: wordId.toString(),
    data: {
      progress: progress,
    },
  });
}
