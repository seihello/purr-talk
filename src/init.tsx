import React from "react";
import { Dimensions, Image, View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

const PURR_TALK_TEXT_IMAGE_WIDTH = 216;

export default function InitPage({ navigation }: any) {
  const { width } = Dimensions.get("window");

  return (
    <View className="flex h-screen w-screen flex-col items-center px-8 pb-8 pt-24">
      <Image
        source={require(`../assets/img/woman_with_cat.png`)}
        style={{
          width: 348,
          height: 417,
        }}
      />
      <View className="flex w-full flex-1 flex-col items-center justify-center py-16">
        <Text className="mb-1 text-center font-nunito-bold text-[36px] leading-[41.66px] text-gray-900">
          Welcome to
        </Text>
        <Image
          source={require(`../assets/img/purr_talk_primary.png`)}
          style={{
            width: 193,
            height: 35,
          }}
        />
        <Text className="mt-8 text-center text-[18px] text-gray-700">
          Find out what your cat’s really saying!
        </Text>
      </View>
      <Button
        title="Get started"
        onPress={() => {
          navigation.push("ProfileInput");
        }}
      />
    </View>
  );
}
