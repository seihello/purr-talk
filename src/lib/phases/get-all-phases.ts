import Phase from "../../types/phase.type";
import { supabase } from "../supabase";

export default async function getAllPhases(): Promise<Phase[]> {
  const phasesRes = await supabase
    .from("phases")
    .select("*")
    .order("id", { ascending: true });

  if (phasesRes.error) {
    throw new Error(phasesRes.error.message);
  }

  if (!phasesRes.data || phasesRes.data.length === 0) {
    throw new Error("Phases not found");
  }

  return phasesRes.data;
}
