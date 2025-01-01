import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import getProfile from "./lib/progress/get-profile";
import Profile from "./types/profile.type";

export default function ProfileReadyPage({ navigation }: any) {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const run = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };
    run();
  }, []);

  if (!profile) return;

  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-16 pt-32">
      <Text>{`Nice to meet you, ${profile.name} and ${profile.catName}!`}</Text>
      <Button
        title="Continue"
        onPress={() => {
          navigation.push("Introduction");
        }}
        className="bg-primary-900"
      />
    </View>
  );
}
