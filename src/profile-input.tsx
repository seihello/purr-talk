import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Dimensions, Image, TextInput, View } from "react-native";
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
  const [furColor, setFurColor] = useState<FurColor>(FurColor.Tuxedo);
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
    <View className="relative flex h-screen w-screen flex-col items-stretch pb-8 pt-24">
      <View className="px-6">
        <Text className="font-nunito-bold text-[32px]">
          Let's get your profile ready!
        </Text>
      </View>

      <View className="flex grow flex-col px-6">
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
          value={FurColor[furColor as keyof typeof FurColor]}
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
      <View className="grow">
        <Image
          source={require(`../assets/img/pink_wave2.png`)}
          style={{
            width: width,
            height: (width * 334) / 1572,
          }}
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
            className="absolute z-50 bg-white"
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

      <View className="mb-4 flex flex-row items-center justify-start gap-x-4 px-6">
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color="#4651D1"
        />
        <View className="grow">
          <Text className="text-[16px]">
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
            {"\n"}and{" "}
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
      </View>

      <View className="px-6">
        <Button
          title="Continue"
          onPress={onPress}
          disabled={!name || !catName || !furColor || !isChecked}
        />
      </View>
    </View>
  );
}
