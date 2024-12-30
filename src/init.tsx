import React from "react";
import { Dimensions, Image, View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

export default function InitPage({ navigation }: any) {
  const { width } = Dimensions.get("window");

  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-16 pt-32">
      <Image source={require(`../assets/img/top.png`)} className="" />
      <View className="flex w-full flex-1 flex-col items-center justify-start gap-y-2 py-16">
        <Text className="text-center font-nunito-bold text-[36px] leading-[41.66px] text-gray-900">
          Welcome to
        </Text>
        <Image
          source={require(`../assets/img/purr_talk_text.png`)}
          className=""
        />
        <Text className="text-center text-[18px] leading-[41.66px] text-gray-900">
          Find out what your cat’s really saying!
        </Text>
      </View>
      <Button
        title="Get started"
        onPress={() => {
          navigation.push("Profile");
        }}
        className="bg-primary-900"
      />
    </View>
  );
}
