import Progress from "../../enum/progress.enum";
import Word from "../../types/word.type";
import { supabase } from "../supabase";
import getWordProgress from "./get-word-progress";

export default async function getCourseWords(phaseId: number): Promise<Word[]> {
  try {
    const phaseWordIdsRes = await supabase
      .from("word_phases")
      .select("word_id")
      .eq("phase_id", phaseId)
      .eq("enable", true);

    if (!phaseWordIdsRes.data || phaseWordIdsRes.data.length === 0) {
      throw new Error(
        `Words not found for this phase. (Phase ID = ${phaseId})`,
      );
    }

    const phaseWordIds = phaseWordIdsRes.data.map((row) => row.word_id);

    const wordsRes = await supabase
      .from("words")
      .select("*, sentences(sentence)")
      .in("id", phaseWordIds);

    if (wordsRes.error) {
      throw new Error(wordsRes.error.message);
    }

    const words: Word[] = [];
    if (wordsRes.data) {
      for (const wordRow of wordsRes.data) {
        const sentences: string[] = wordRow.sentences.map(
          (sentence: any) => sentence.sentence,
        );
        let progress = Progress.New;
        try {
          progress = await getWordProgress(wordRow.id);
        } catch (error) {
          console.error(error);
        }
        words.push({ ...wordRow, sentences, progress });
      }
      // const words = data.map((row) => {
      //   const sentences = row.sentences.map(
      //     (sentence: any) => sentence.sentence,
      //   );
      //   const progress = await getWordProgress
      //   return { ...row, sentences,  };
      // });
    }
    return words;
  } catch (error) {
    throw error;
  }
}
