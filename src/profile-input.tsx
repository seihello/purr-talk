import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Dimensions, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrivacyPolicy from "./components/profile-input/privacy-policy";
import TermsAndConditions from "./components/profile-input/terms-and-conditions";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import FurColor from "./enum/fur-color.enum";
import updateProfile from "./lib/progress/update-profile";

export default function ProfileInputPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  const [name, setName] = useState<string>("");
  const [catName, setCatName] = useState<string>("");
  const [furColor, setFurColor] = useState<FurColor>();
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  console.log("FurColor", furColor);

  const onPress = async () => {
    if (name && catName && furColor) {
      await updateProfile(name, catName, furColor);
      navigation.push("ProfileReady");
    }
  };
  return (
    <View className="relative flex h-screen w-screen flex-col items-stretch px-8 pb-8 pt-24">
      <Text className="font-nunito-bold text-[36px]">
        Let's get your profile ready!
      </Text>

      <View className="flex flex-1 flex-col">
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
      </View>

      {isTermsOpen && (
        <>
          <View
            onTouchEnd={(e: any) => {
              e.stopPropagation();
              setIsTermsOpen(false);
            }}
            className="absolute z-50 bg-white"
            style={{
              right: width * 0.05 + 16,
              top: height * 0.1 + 16,
            }}
          >
            <Icon name="close-box" color="#4651D1" size={32} />
          </View>
          <TermsAndConditions />
        </>
      )}

      {isPrivacyPolicyOpen && (
        <>
          <View
            onTouchEnd={(e: any) => {
              e.stopPropagation();
              setIsPrivacyPolicyOpen(false);
            }}
            className="absolute z-50 z-50 bg-white"
            style={{
              right: width * 0.05 + 16,
              top: height * 0.1 + 16,
            }}
          >
            <Icon name="close-box" color="#4651D1" size={32} />
          </View>
          <PrivacyPolicy />
        </>
      )}

      <View className="mb-4 flex flex-row items-center justify-between gap-x-4">
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color="#4651D1"
        />
        <Text className="text-[18px]">
          I agree to PurrTalk's{" "}
          <Text
            className="text-primary-900 underline"
            onTouchEnd={(e: any) => {
              e.stopPropagation();
              setIsTermsOpen(true);
              setIsPrivacyPolicyOpen(false);
            }}
          >
            Terms and Conditions{" "}
          </Text>
          and{" "}
          <Text
            className="text-primary-900 underline"
            onTouchEnd={(e: any) => {
              e.stopPropagation();
              setIsPrivacyPolicyOpen(true);
              setIsTermsOpen(false);
            }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>

      <Button
        title="Continue"
        onPress={onPress}
        disabled={!name || !catName || !furColor || !isChecked}
      />
    </View>
  );
}
