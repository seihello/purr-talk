import { useEffect, useState } from "react";
import getProfile from "../lib/progress/get-profile";
import Profile from "../types/profile.type";

export default function useProfile() {
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      try {
        const profile = await getProfile();
        setProfile(profile);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

  return { profile, isLoading };
}
