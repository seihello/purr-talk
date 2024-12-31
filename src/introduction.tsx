import React from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

export default function IntroductionPage({ navigation }: any) {
  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-16 pt-32">
      <Text>How Translation Works</Text>
      <Button
        title="Get started"
        onPress={() => {
          navigation.push("Home");
        }}
        className="bg-primary-900"
      />
    </View>
  );
}
