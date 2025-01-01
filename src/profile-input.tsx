import React, { useState } from "react";
import { TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import FurColor from "./enum/progress.enum";
import updateProfile from "./lib/progress/update-profile";

export default function ProfileInputPage({ navigation }: any) {
  const [name, setName] = useState<string>("");
  const [catName, setCatName] = useState<string>("");
  const [furColor, setFurColor] = useState<FurColor>();

  console.log("FurColor", furColor);

  const onPress = async () => {
    if (name && catName && furColor) {
      await updateProfile(name, catName, furColor);
      navigation.push("ProfileReady");
    }
  };
  return (
    <View className="flex h-screen w-screen flex-col items-stretch px-8 pb-16 pt-32">
      <Text className="font-nunito-bold text-4xl">
        Let's get your profile ready!
      </Text>

      <Text className="mb-1 mt-6">Your Name</Text>
      <TextInput
        placeholder="Your Name"
        editable
        onChangeText={(value) => setName(value)}
        className="h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
      />
      <Text className="mb-1 mt-6">Your Cat's Name</Text>
      <TextInput
        placeholder="Your Cat's Name"
        editable
        onChangeText={(value) => setCatName(value)}
        className="text-md h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
      />
      <Text className="mb-1 mt-6">Fur Color</Text>
      <RNPickerSelect
        onValueChange={(value) =>
          setFurColor(FurColor[value as keyof typeof FurColor])
        }
        items={Object.keys(FurColor).map((color, index) => ({
          label: String(FurColor[color as keyof typeof FurColor]),
          value: color,
          key: index,
        }))}
        style={{
          inputIOS: {
            height: 44,
            fontSize: 16,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#E2E5E7",
            borderRadius: 100,
            color: "black",
            backgroundColor: "white",
            paddingRight: 30, // to ensure the text is always visible
          },
        }}
        placeholder={{ label: "Select Fur Color", value: null }}
      />

      <Button
        title="Get started"
        onPress={onPress}
        className="mt-8 bg-primary-900"
        disabled={!name || !catName || !furColor}
      />
    </View>
  );
}
