import React, { useEffect, useState } from "react";
import { Dimensions, Image, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import FurColor from "../enum/fur-color.enum";
import useProfile from "../hooks/use-profile";
import CAT_IMAGES from "../lib/cats/cat-images";
import updateProfile from "../lib/progress/update-profile";

export default function ProfileSettingPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  const { profile } = useProfile();

  const [name, setName] = useState<string>("");
  const [catName, setCatName] = useState<string>("");
  const [furColor, setFurColor] = useState<FurColor>();

  const onSave = async () => {
    if (name && catName && furColor) {
      await updateProfile(name, catName, furColor);
      navigation.replace("Home");
    }
  };

  useEffect(() => {
    if (profile && !name && !catName && !furColor) {
      console.log("saved value", profile.furColor);
      setName(profile.name);
      setCatName(profile.catName);
      setFurColor(profile.furColor);
    }
  }, [profile]);

  if (!profile) return;

  return (
    <View className="relative flex h-full w-screen flex-col items-stretch bg-[#E8E7F7] pb-8 pt-6">
      <View className="flex flex-col items-start px-6">
        <Text className="mb-1 mt-6 px-1">Your Name</Text>
        <TextInput
          placeholder="Your Name"
          editable
          value={name}
          onChangeText={(value) => setName(value)}
          className="h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
        />
        <Text className="mb-1 mt-6 px-1">Your Cat's Name</Text>
        <TextInput
          placeholder="Your Cat's Name"
          editable
          value={catName}
          onChangeText={(value) => setCatName(value)}
          className="text-md h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
        />
        <Text className="mb-1 mt-6 px-1">Fur Color</Text>
        <RNPickerSelect
          value={furColor}
          onValueChange={(value) => {
            setFurColor(value);
          }}
          items={Object.values(FurColor).map((color, index) => ({
            label: color,
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
      </View>
      <View className="flex w-full grow items-center justify-center">
        <Image
          source={CAT_IMAGES[furColor ?? profile.furColor]}
          style={{
            width: 283,
            height: 120,
          }}
        />
      </View>

      <View className="px-6">
        <Button
          title="Save"
          onPress={onSave}
          disabled={!name || !catName || !furColor}
        />
      </View>
    </View>
  );
}
