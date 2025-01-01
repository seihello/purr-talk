import React, { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

enum Status {
  Recording,
  Translating,
}

export default function RecordPage({ navigation }: any) {
  const [status, setStatus] = useState(Status.Recording);

  const translate = async () => {
    setStatus(Status.Translating);

    // TODO: Call API to translate the voice
    await new Promise((resolve) => setTimeout(resolve, 5000));

    navigation.replace("Translation", {
      translation:
        "Meow! I’m hungry. Give me some tuna! Meow! I’m hungry. Give me some tuna! Meow! I’m hungry. Give me some!",
    });
  };

  switch (status) {
    case Status.Recording:
      return (
        <View className="flex h-screen flex-col items-center gap-y-2 bg-primary-900 px-2 pt-16">
          <Icon name="microphone" color="#F1AD5A" size={32} />
          <Text className="font-nunito-bold text-[28px] text-white">
            Recording your cat...
          </Text>
          <Button
            title="Stop recording"
            onPress={() => {
              translate();
            }}
            variant="outline"
          />
        </View>
      );

    case Status.Translating:
      return (
        <View className="flex h-screen flex-col items-center gap-y-2 bg-primary-900 px-2 pt-16">
          <Text className="text-center font-nunito-bold text-[28px] text-white">
            Turning meows into human words...
          </Text>
        </View>
      );
  }
}
