import React from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

export default function HomePage({ navigation }: any) {
  return (
    <View className="flex h-screen w-full flex-col justify-between bg-primary-900 pt-16">
      <Text>PurrTalk</Text>
      <Text>Hi Kanako and Tora!</Text>
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
