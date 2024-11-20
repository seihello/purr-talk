import Progress from "../../enum/progress.enum";
import { supabase } from "../supabase";
import getWordProgress from "./get-word-progress";

export default async function getCourseProgress(
  categoryId: number,
  phaseId: number,
) {
  try {
    const phaseWordIdsRes = await supabase
      .from("word_phases")
      .select("word_id")
      .eq("phase_id", phaseId);

    if (!phaseWordIdsRes.data || phaseWordIdsRes.data.length === 0) {
      throw new Error(
        `Words not found for this phase. (Phase ID = ${phaseId})`,
      );
    }

    let masteredCount = 0;
    for (const row of phaseWordIdsRes.data) {
      const progress: Progress = await getWordProgress(row.word_id);
      if (progress === Progress.Mastered) {
        masteredCount++;
      }
    }

    return { total: phaseWordIdsRes.data.length, masteredCount: masteredCount };
  } catch (error) {
    throw error;
  }
}
