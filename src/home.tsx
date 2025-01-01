import React from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";

export default function HomePage({ navigation }: any) {
  const profile = useProfile();

  if (!profile) return;
  return (
    <View className="flex h-screen w-full flex-col justify-between bg-primary-900 pt-16">
      <Text>PurrTalk</Text>
      <Text>{`Hi ${profile.name} and ${profile.catName}!`}</Text>
      <View>
        <Text>Record your cat</Text>
      </View>
      <Button
        title="Start recording"
        onPress={() => {
          navigation.push("Translate");
        }}
        className="bg-primary-900"
      />
    </View>
  );
}
