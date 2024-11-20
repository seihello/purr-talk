import Progress from "../../enum/progress.enum";
import storage from "../local-storage";

export default async function getWordProgress(
  wordId: number,
): Promise<Progress> {
  try {
    const { progress } = await storage.load({
      key: wordId.toString(),
    });
    return progress;
  } catch (error: any) {
    return Progress.New;
  }
}
