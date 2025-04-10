import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../constants/urls";
import FurColor from "../enum/fur-color.enum";
import updateProfile from "../lib/progress/update-profile";

export default function ProfileInputPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  const [name, setName] = useState<string>("");
  const [catName, setCatName] = useState<string>("");
  const [furColor, setFurColor] = useState<FurColor>();
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

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
        <Text className="mb-1 mt-6 text-left">Your Name</Text>
        <TextInput
          placeholder="Your Name"
          editable
          onChangeText={(value) => setName(value)}
          className="h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
        />
        <Text className="mb-1 mt-6 text-left">Your Cat's Name</Text>
        <TextInput
          placeholder="Your Cat's Name"
          editable
          onChangeText={(value) => setCatName(value)}
          className="text-md h-[44px] w-full rounded-full border-[1px] border-gray-200 bg-white px-4 text-[16px]"
        />
        <Text className="mb-1 mt-6 text-left">Fur Color</Text>
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
      <View className="grow">
        <Image
          source={require(`../../assets/img/pink_wave2.png`)}
          style={{
            width: width,
            height: (width * 334) / 1572,
          }}
        />
      </View>

      <View className="mb-4 flex flex-row items-center justify-start gap-x-4 px-6">
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color="#4651D1"
        />
        <View className="grow">
          <View className="flex flex-row items-center">
            <Text className="text-[16px]">I agree to PurrTalk's </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={async (e: any) => {
                e.stopPropagation();
                if (await Linking.canOpenURL(TERMS_AND_CONDITIONS)) {
                  await Linking.openURL(TERMS_AND_CONDITIONS);
                }
              }}
            >
              <Text className="text-[16px] text-primary-900 underline">
                Terms and Conditions{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center">
            <Text className="text-[16px]">and </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={async (e: any) => {
                e.stopPropagation();
                if (await Linking.canOpenURL(PRIVACY_POLICY)) {
                  await Linking.openURL(PRIVACY_POLICY);
                }
              }}
            >
              <Text className="text-[16px] text-primary-900 underline">
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text className="text-[16px]">.</Text>
          </View>
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
