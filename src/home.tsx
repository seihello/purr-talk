import React from "react";
import { Dimensions, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import FurColor from "./enum/fur-color.enum";
import useProfile from "./hooks/use-profile";

const CAT_IMAGES: { [key: string]: any } = {};
CAT_IMAGES[String(FurColor.Tuxedo)] = require("../assets/img/cats/tuxedo.png");
CAT_IMAGES[
  String(FurColor.BrownTabby)
] = require("../assets/img/cats/brown_tabby.png");
CAT_IMAGES[
  String(FurColor.SolidBlack)
] = require("../assets/img/cats/solid_black.png");
CAT_IMAGES[
  String(FurColor.SolidWhite)
] = require("../assets/img/cats/solid_white.png");
CAT_IMAGES[String(FurColor.Calico)] = require("../assets/img/cats/calico.png");
CAT_IMAGES[
  String(FurColor.BlackWhiteTabby)
] = require("../assets/img/cats/black_white_tabby.png");

export default function HomePage({ navigation }: any) {
  const { width } = Dimensions.get("window");

  const { profile } = useProfile();

  if (!profile) return;
  return (
    <View className="flex h-screen w-full flex-col gap-y-2">
      <View className="flex flex-col bg-primary-900 px-8 pb-16 pt-24">
        <Image
          source={require(`../assets/img/purr_talk_white.png`)}
          style={{
            width: 130,
            height: 24,
          }}
        />
        <Text className="mt-2 font-nunito-semibold text-[22px] text-white">{`Hi ${profile.name} and ${profile.catName}!`}</Text>
      </View>
      <View className="space-y-6 px-4 pt-16">
        <View className="flex flex-col items-center gap-y-2 rounded-lg bg-[#F4EAE1] p-4 shadow-sm shadow-gray-500">
          <Image
            source={CAT_IMAGES[profile.furColor]}
            style={{
              width: 283,
              height: 120,
              transform: [{ translateY: -24 }, { scaleX: -1 }],
            }}
            className="absolute bottom-full"
          />
          <Icon name="microphone" color="#4651D1" size={36} />
          <Text className="font-nunito-bold text-[24px]">Record your cat</Text>
          <Text className="text-[16px]">for your chatty cat</Text>
          <Image
            source={require(`../assets/img/orange_wave.png`)}
            style={{
              width: width - 16 * 2,
              height: (width * 71) / 364,
            }}
          />
          <Button
            title="Start recording"
            onPress={() => {
              navigation.push("Record");
            }}
            icon={<Icon name="microphone" color="white" size={36} />}
          />
        </View>
        <View className="flex flex-col items-center gap-y-2 rounded-lg border border-dashed border-gray-300 bg-[#EFEFEF] p-4 shadow-gray-500">
          <Text className="font-nunito-bold text-[24px]">
            Upload Videos Coming Soon
          </Text>
          <Text className="mb-4 text-[16px]">
            We're working on this for your quiet kitty!
          </Text>
          <Button
            title="Coming Soon!"
            onPress={() => {}}
            disabled={true}
            variant="upcoming"
            icon={<Icon name="upload" color="#8B8A95" size={36} />}
          />
        </View>
      </View>
    </View>
  );
}
