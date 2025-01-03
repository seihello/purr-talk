import React from "react";
import { Image, View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";

export default function ProfileReadyPage({ navigation }: any) {
  const { profile } = useProfile();

  if (!profile) return;

  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-8 pt-24">
      <Image
        source={require(`../assets/img/man_with_cat.png`)}
        style={{
          width: 348,
          height: 417,
        }}
      />
      <View className="flex flex-1 flex-col justify-center">
        <Text className="font-nunito-bold text-[32px]">{`Nice to meet you,\n${profile.name} and ${profile.catName}!`}</Text>
      </View>
      <Button
        title="Continue"
        onPress={() => {
          navigation.push("Introduction");
        }}
      />
    </View>
  );
}
