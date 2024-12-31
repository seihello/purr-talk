import React from "react";
import { View } from "react-native";
import Button from "./ui/button";
import Text from "./ui/text";

export default function HomePage({ navigation }: any) {
  return (
    <View className="flex h-screen w-full flex-col justify-between bg-primary-900 pt-16">
      <Text>Purrfect!</Text>
      <Text>Your translation is complete</Text>
      <Button
        title="Re-record"
        onPress={() => {
          navigation.push("Record");
        }}
        className="bg-primary-900"
      />
    </View>
  );
}
