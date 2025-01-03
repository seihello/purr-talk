import React from "react";
import { Image, View } from "react-native";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";
import CAT_IMAGES from "./lib/cats/cat-images";

enum Status {
  Recording,
  Translating,
  Done,
}

export default function TranslationPage({ navigation, route }: any) {
  const { profile } = useProfile();

  if (!profile) return;

  return (
    <View className="flex h-full w-full flex-col items-center justify-between bg-primary-300 px-4 py-16">
      <View className="flex flex-col items-center gap-y-1">
        <Text className="text-center font-nunito-bold text-[32px]">
          Purrfect!
        </Text>
        <Text className="text-[16px] text-gray-700">
          Your translation is complete
        </Text>
      </View>
      <View className="flex w-full flex-col rounded-xl bg-white py-6">
        <View className="px-6">
          <Text className="font-nunito-semibold text-[24px] text-primary-900">
            {route.params.translation}
          </Text>
        </View>
        <View className="my-6 h-[1px] w-full bg-gray-100" />
        <View className="flex w-full flex-row justify-center">
          <Image
            source={require(`../assets/img/blue_pink_wave.png`)}
            style={{
              width: 236,
              height: 43,
            }}
          />
        </View>
      </View>
      <Image
        source={CAT_IMAGES[profile.furColor]}
        style={{
          width: 283,
          height: 120,
        }}
      />
      <Button
        title="Re-record"
        onPress={() => {
          navigation.replace("Record");
        }}
        variant="outline"
      />
    </View>
  );
}
