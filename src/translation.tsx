import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

  const [sound, setSound] = useState<Audio.Sound>(new Sound());
  // await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

  async function onPlayCatVoice() {
    console.log("Loading Sound", route.params.voiceUrl);
    // const { sound } = await Audio.Sound.createAsync(route.params.voiceUrl);
    await sound.loadAsync({ uri: route.params.voiceUrl }, {}, true);
    // setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  if (!profile) return;

  return (
    <View className="flex h-full w-full flex-col items-center justify-between bg-primary-300 px-4 pb-8">
      <View className="flex grow flex-col items-center justify-center gap-y-1 pb-2">
        <Text className="text-center font-nunito-bold text-[32px]">
          Purrfect!
        </Text>
        <Text className="text-[16px] text-gray-700">
          Your translation is complete
        </Text>
      </View>
      <View className="flex w-full shrink grow-0 flex-col rounded-xl bg-white px-6 py-6">
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={true}
        >
          <Text className="font-nunito-semibold text-[24px] text-primary-900">
            {route.params.translation}
            {/* You’re warm, and you smell familiar. I’ll curl up here and purr for
            you… just don’t move. You’re warm, and you smell familiar. I’ll curl
            up here and purr for you… just don’t move. */}
          </Text>
        </ScrollView>
        <View className="my-6 h-[1px] w-full bg-gray-100" />
        <View className="flex w-full flex-row items-center justify-center gap-x-4">
          <Image
            source={require(`../assets/img/blue_pink_wave.png`)}
            style={{
              width: 236,
              height: 43,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              onPlayCatVoice();
            }}
            className="flex h-[42px] w-[42px] flex-col items-center justify-center rounded-full bg-primary-900 px-[5px]"
            activeOpacity={0.8}
          >
            <Icon name="play-outline" color="white" size={36} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex grow items-center justify-center">
        <Image
          source={CAT_IMAGES[profile.furColor]}
          style={{
            width: 283,
            height: 120,
          }}
        />
      </View>

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
