import Progress from "../../enum/progress.enum";
import WordInfo from "../../types/word-info.type";
import { supabase } from "../supabase";
import getWordProgress from "./get-word-progress";

export default async function getAllWordInfo(): Promise<WordInfo[]> {
  try {
    const wordInfoListRes = await supabase
      .from("words")
      .select("id, word_categories(category_id), word_phases(phase_id)")
      .eq("enable", true);

    if (wordInfoListRes.error) {
      throw new Error(wordInfoListRes.error.message);
    }

    const wordInfoList: WordInfo[] = [];
    if (wordInfoListRes.data) {
      for (const wordInfoRow of wordInfoListRes.data) {
        const categoryIds: number[] = wordInfoRow.word_categories.map(
          (category: any) => category.category_id,
        );
        const phaseIds: number[] = wordInfoRow.word_phases.map(
          (phase: any) => phase.phase_id,
        );
        let progress = Progress.New;
        try {
          progress = await getWordProgress(wordInfoRow.id);
        } catch (error) {
          console.error(error);
        }
        wordInfoList.push({
          id: wordInfoRow.id,
          categoryIds,
          phaseIds,
          progress,
        });
      }
      // const words = data.map((row) => {
      //   const sentences = row.sentences.map(
      //     (sentence: any) => sentence.sentence,
      //   );
      //   const progress = await getWordProgress
      //   return { ...row, sentences,  };
      // });
    }
    return wordInfoList;
  } catch (error) {
    throw error;
  }
}
