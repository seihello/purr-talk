import React from "react";
import { Dimensions, Image, View } from "react-native";
import Button from "../components/ui/button";
import Text from "../components/ui/text";

const PURR_TALK_TEXT_IMAGE_WIDTH = 216;

export default function InitPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  return (
    <View className="flex h-screen w-screen flex-col items-center pb-8 pt-12">
      <View className="flex shrink grow items-center justify-center">
        <Image
          source={require(`../../assets/img/woman_with_cat.png`)}
          style={{
            width: width * 0.9,
            height: (width * 0.9 * 417) / 348,
          }}
        />
      </View>
      <View className="flex w-full grow flex-col items-center justify-center">
        <View className="relative w-full">
          <View
            className="absolute bottom-full"
            style={{
              transform: [{ translateY: 16 }],
            }}
          >
            <Image
              source={require(`../../assets/img/pink_wave1.png`)}
              style={{
                width: width,
                height: (width * 529) / 1572,
              }}
            />
          </View>
          <Text className="mb-1 text-center font-nunito-bold text-[36px] text-gray-900">
            Welcome to
          </Text>
        </View>
        <Image
          source={require(`../../assets/img/purr_talk_primary.png`)}
          style={{
            width: 193,
            height: 35,
          }}
        />
        <Text className="mt-8 text-center text-[18px] text-gray-700">
          Find out what your cat’s really saying!
        </Text>
      </View>
      <View className="flex w-full grow flex-col justify-end px-6">
        <Button
          title="Get started"
          onPress={() => {
            navigation.push("ProfileInput");
          }}
        />
      </View>
    </View>
  );
}
