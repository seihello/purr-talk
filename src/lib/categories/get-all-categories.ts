import Category from "../../types/category.type";
import { supabase } from "../supabase";

export default async function getAllCategories(): Promise<Category[]> {
  const categoriesRes = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (categoriesRes.error) {
    throw new Error(categoriesRes.error.message);
  }

  if (!categoriesRes.data || categoriesRes.data.length === 0) {
    throw new Error("Categories not found");
  }

  return categoriesRes.data;
}
