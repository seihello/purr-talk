import React from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";

export default function ProfileReadyPage({ navigation }: any) {
  const profile = useProfile();

  if (!profile) return;

  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-16 pt-32">
      <Text className="font-nunito-bold text-[32px]">{`Nice to meet you,\n${profile.name} and ${profile.catName}!`}</Text>
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
