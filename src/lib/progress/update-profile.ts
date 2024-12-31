import FurColor from "../../enum/progress.enum";
import storage from "../local-storage";

export default async function updateProfile(
  name: string,
  catName: string,
  furColor: FurColor,
) {
  await storage.save({
    key: "profile",
    data: {
      name: name,
      catName: catName,
      furColor: furColor,
    },
  });
}