import React from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

enum Status {
  Recording,
  Translating,
  Done,
}

export default function TranslationPage({ navigation, route }: any) {
  return (
    <View className="flex h-full w-full flex-col justify-between bg-primary-300 px-2 py-16">
      <View className="flex flex-col items-center">
        <Text className="text-center font-nunito-bold text-[28px]">
          Purrfect!
        </Text>
        <Text>Your translation is complete</Text>
      </View>
      <View className="w-full rounded-xl bg-white p-2">
        <Text className="text-primary-900">{route.params.translation}</Text>
        <View className="h-[1px] w-full bg-gray-100" />
      </View>
      <Button
        title="Re-record"
        onPress={() => {
          navigation.replace("Record");
        }}
        variant="outline"
      />
    </View>
  );
}
