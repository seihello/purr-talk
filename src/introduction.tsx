import React from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

export default function IntroductionPage({ navigation }: any) {
  return (
    <View className="flex h-screen w-screen flex-col items-center gap-y-2 px-4 pb-8 pt-24">
      <Image
        source={require(`../assets/img/chatting_cats.png`)}
        style={{
          width: 360,
          height: 309,
        }}
      />
      <View className="mb-2 flex flex-1 flex-col justify-end">
        <Text className="font-nunito-bold text-[32px]">
          How Translation Works
        </Text>
      </View>

      <View className="flex w-full flex-col gap-y-4 rounded-xl border border-gray-300 bg-[#F4EAE1] px-6 pb-6 pt-2">
        <View className="flex flex-row items-center gap-x-2">
          <Icon name="microphone" color="#4651D1" size={36} />
          <Text className="font-nunito-bold text-[24px]">Record</Text>
        </View>
        <Text className="font-nunito-semibold text-[18px]">
          <Text className="font-nunito-bold text-primary-900">
            Got a talkative kitty?
          </Text>{" "}
          Record their meows and translate to human language!
        </Text>
      </View>

      <View className="bg-primary-500 mb-2 flex w-full flex-col gap-y-4 rounded-xl border border-gray-300 px-6 pb-6 pt-2">
        <View className="flex flex-row items-center gap-x-2">
          <Icon name="upload" color="#4651D1" size={36} />
          <Text className="font-nunito-bold text-[24px]">Upload</Text>
        </View>
        <Text className="font-nunito-semibold text-[18px]">
          <Text className="font-nunito-bold text-primary-900">
            Have a camera-shy cat?
          </Text>{" "}
          Upload a video and discover their hidden messages!
        </Text>
      </View>

      <Button
        title="Get started"
        onPress={() => {
          navigation.push("Home");
        }}
      />
    </View>
  );
}
