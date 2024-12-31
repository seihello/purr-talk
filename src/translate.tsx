import React, { useState } from "react";
import { View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

enum Status {
  Recording,
  Translating,
  Done,
}

export default function TranslatePage({ navigation }: any) {
  const [status, setStatus] = useState(Status.Recording);

  const translate = async () => {
    setStatus(Status.Translating);

    // TODO: Call API to translate the voice
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setStatus(Status.Done);
  };

  switch (status) {
    case Status.Recording:
      return (
        <View>
          <Text>Recording your cat...</Text>
          <Button
            title="Stop recording"
            onPress={() => {
              translate();
            }}
            className="bg-primary-900"
          />
        </View>
      );

    case Status.Translating:
      return (
        <View>
          <Text>Turning meows into human words...</Text>
        </View>
      );

    case Status.Done:
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
}
