import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";

export default function HomePage({ navigation }: any) {
  const { profile } = useProfile();

  if (!profile) return;
  return (
    <View className="flex h-screen w-full flex-col gap-y-2">
      <View className="bg-primary-900 pt-16">
        <Text className="font-nunito-bold text-[32px] text-white">
          PurrTalk
        </Text>
        <Text className="text-white">{`Hi ${profile.name} and ${profile.catName}!`}</Text>
      </View>
      <View className="px-2">
        <View className="flex flex-col items-center gap-y-2 rounded-lg bg-[#F4EAE1] p-2 shadow-sm">
          <Icon name="microphone" color="#4651D1" size={32} />
          <Text className="font-nunito-bold text-[24px]">Record your cat</Text>
          <Text>for your chatty cat</Text>
          <Button
            title="Start recording"
            onPress={() => {
              navigation.push("Record");
            }}
          />
        </View>
      </View>
    </View>
  );
}
