import { useEffect, useState } from "react";
import getProfile from "../lib/progress/get-profile";
import Profile from "../types/profile.type";

export default function useProfile() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const run = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };
    run();
  }, []);

  return profile;
}
