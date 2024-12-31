import Profile from "../../types/profile.type";
import storage from "../local-storage";

export default async function getProfile(): Promise<Profile> {
  try {
    const profile = await storage.load({
      key: "profile",
    });
    return profile;
  } catch (error: any) {
    return error;
  }
}
