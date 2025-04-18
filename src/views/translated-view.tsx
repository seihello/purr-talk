import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import RecordStatus from "../enum/record-status.enum";
import CAT_IMAGES from "../lib/cats/cat-images";
import Profile from "../types/profile.type";

type Props = {
  profile: Profile;
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
  translation: string;
  voiceUrl: React.MutableRefObject<string>;
};

export default function TranslatedView({
  profile,
  setStatus,
  translation,
  voiceUrl,
}: Props) {
  const [sound, setSound] = useState<Audio.Sound>(new Sound());
  const [isPlayed, setIsPlayed] = useState(false);

  async function onPlayCatVoice() {
    // const { sound } = await Audio.Sound.createAsync(route.params.voiceUrl);
    if (!isPlayed) {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      await sound.loadAsync({ uri: voiceUrl.current }, {}, true);
      setIsPlayed(true);
      await sound.playAsync();
    } else {
      await sound.replayAsync();
    }
  }

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
      <View className="relative flex w-full shrink grow-0 flex-col rounded-xl bg-white px-6 py-6">
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={true}
        >
          <Text className="font-nunito-semibold text-[24px] text-primary-900">
            {translation}
          </Text>
        </ScrollView>
        <View className="my-6 h-[1px] w-full bg-gray-100" />
        <View className="flex w-full flex-row items-center justify-center gap-x-4">
          <Image
            source={require(`../../assets/img/blue_pink_wave.png`)}
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
        <View
          className="absolute bottom-0 left-16"
          style={{
            transform: [{ translateY: 30 }, { scaleY: -1 }],
          }}
        >
          <Icon name="triangle" color="white" size={36} />
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
          setStatus(RecordStatus.Recording);
        }}
        variant="outline"
      />
    </View>
  );
}
