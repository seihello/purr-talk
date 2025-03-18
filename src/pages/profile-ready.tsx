import React from "react";
import { Dimensions, Image, View } from "react-native";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import useProfile from "../hooks/use-profile";

export default function ProfileReadyPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  const { profile } = useProfile();

  if (!profile) return;

  return (
    <View className="flex h-screen w-screen flex-col items-center pb-8 pt-12">
      <View className="flex shrink grow items-center justify-center">
        <Image
          source={require(`../../assets/img/man_with_cat.png`)}
          style={{
            width: width * 0.9,
            height: (width * 0.9 * 382) / 348,
          }}
        />
      </View>
      <View className="relative flex min-h-[200px] w-full grow flex-col px-6 pt-[86px]">
        <View className="absolute bottom-full">
          <Image
            source={require(`../../assets/img/pink_wave3.png`)}
            style={{
              width: width,
              height: (width * 514) / 1572,
            }}
          />
        </View>
        <Text className="text-center font-nunito-bold text-[32px] leading-10">{`Nice to meet you,\n${profile.name} and ${profile.catName}!`}</Text>
      </View>
      <View className="w-full px-6">
        <Button
          title="Continue"
          onPress={() => {
            navigation.push("Introduction");
          }}
        />
      </View>
    </View>
  );
}
