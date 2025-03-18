import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import useProfile from "../hooks/use-profile";
import CAT_IMAGES from "../lib/cats/cat-images";

export default function HomePage({ navigation }: any) {
  const { width } = Dimensions.get("window");

  const { profile } = useProfile();

  if (!profile) return;
  return (
    <ScrollView
      className="relative z-0 h-screen w-screen bg-white"
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={true}
    >
      <View className="z-20 flex min-h-screen w-full flex-col pb-16">
        <View className="relative flex w-full flex-row items-center justify-between bg-primary-900 px-8 pb-16 pt-24">
          <View className="flex flex-col">
            <Image
              source={require(`../../assets/img/purr_talk_white.png`)}
              style={{
                width: 130,
                height: 24,
              }}
            />
            <Text className="mt-2 font-nunito-semibold text-[20px] text-[#F6F6F6]">{`Hi ${profile.name} and ${profile.catName}!`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Your Profile");
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F6F6]/80"
            activeOpacity={0.8}
          >
            <Icon name="cog-outline" color="#4651D1" size={24} />
          </TouchableOpacity>
          <View
            className="absolute bottom-0 rounded-full bg-white"
            style={{
              width: width * 3.2,
              height: width * 3.2,
              transform: [
                { translateX: -width * 1.6 + width * 0.5 },
                { translateY: 1210 },
              ],
            }}
          />
        </View>
        <View className="grow space-y-6 bg-white px-4 pt-16">
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
            <Text className="font-nunito-bold text-[24px]">
              Record your cat
            </Text>
            <Text className="text-[16px]">for your chatty cat</Text>
            <Image
              source={require(`../../assets/img/orange_wave.png`)}
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
      <View className="absolute -top-[500px] left-0 z-10 h-screen w-full bg-primary-900" />
    </ScrollView>
  );
}
