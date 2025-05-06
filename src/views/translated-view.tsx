import { Audio, AVPlaybackStatus } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Cat from "../components/cat";
import TemplateView from "../components/template-view";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import RecordStatus from "../enum/record-status.enum";
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
  const [sound, _] = useState<Audio.Sound>(new Sound());
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>();

  async function onPlay() {
    if (playbackStatus?.isLoaded) {
      if (playbackStatus.positionMillis === playbackStatus.durationMillis) {
        await sound.replayAsync();
        soundWave.current?.reset();
        soundWave.current?.play();
      } else {
        await sound.playAsync();
        soundWave.current?.resume();
      }
    }
  }

  async function onPause() {
    await sound.pauseAsync();
    soundWave.current?.pause();
  }

  useEffect(() => {
    const init = async () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate((status) => setPlaybackStatus(status));
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        await sound.loadAsync({ uri: voiceUrl.current }, {}, true);
      }
    };
    init();
  }, [sound]);

  useEffect(() => {
    if (playbackStatus?.isLoaded) {
      if (!playbackStatus.isPlaying && !playbackStatus.shouldPlay) {
        soundWave.current?.pause();
      }
    }
  });

  const soundWave = useRef<LottieView>(null);

  return (
    <TemplateView background="light" className="px-4 pb-8 pt-8">
      <View className="flex grow flex-col items-center justify-center gap-y-1 pb-2">
        <Text className="text-center font-nunito-bold text-[32px]">
          Purrfect!
        </Text>
        <Text className="text-[16px] text-gray-700">
          Your translation is complete
        </Text>
      </View>
      <View className="relative flex w-full shrink grow-0 flex-col items-stretch rounded-xl bg-white px-6 py-6">
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={true}
        >
          <Text className="text-left font-nunito-semibold text-[24px] text-primary-900">
            {translation}
          </Text>
        </ScrollView>
        <View className="my-6 h-[1px] bg-gray-100" />
        <View className="flex flex-row items-center justify-between">
          <LottieView
            source={require(`../../assets/components/sound_wave_loop.json`)}
            ref={soundWave}
            style={{
              width: 236,
              height: 43,
            }}
          />
          {playbackStatus &&
          playbackStatus.isLoaded &&
          playbackStatus.isPlaying ? (
            <TouchableOpacity onPress={() => onPause()} activeOpacity={0.8}>
              <Image
                source={require(`../../assets/img/icons/pause.png`)}
                style={{
                  width: 36,
                  height: 36,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onPlay()} activeOpacity={0.8}>
              <Image
                source={require(`../../assets/img/icons/play.png`)}
                style={{
                  width: 36,
                  height: 36,
                }}
              />
            </TouchableOpacity>
          )}
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

      <Cat
        furColor={profile.furColor}
        facePosition="left"
        className="flex grow items-center justify-center"
      />

      <Button
        title="Re-record"
        onPress={() => {
          setStatus(RecordStatus.Recording);
        }}
        variant="outline"
      />
    </TemplateView>
  );
}
