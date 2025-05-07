import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemplateView from "../components/template-view";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import { MAX_RECORDING_SECONDS, MIN_RECORDING_SECONDS } from "../constants";
import ErrorCode from "../enum/error-code.enum";
import RecordStatus from "../enum/record-status.enum";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
  setErrorCode: React.Dispatch<React.SetStateAction<ErrorCode>>;
  setTranslation: React.Dispatch<React.SetStateAction<string>>;
  voiceUrl: React.MutableRefObject<string>;
};

export default function RecordingView({
  setStatus,
  setErrorCode,
  setTranslation,
  voiceUrl,
}: Props) {
  const { width } = Dimensions.get("window");

  const navigation = useNavigation();

  const [isRecording, setIsRecording] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [recording, setRecording] = useState<Audio.Recording>();

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  useEffect(() => {
    setTranslation("");
    voiceUrl.current = "";
  }, []);

  useEffect(() => {
    const record = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        setRecording(recording);
        setIsRecording(true);
      } catch (error) {
        console.error(error);
      }
    };
    record();
  }, []);

  useEffect(() => {
    let interval: any;

    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const run = async () => {
      if (elapsedTime === MAX_RECORDING_SECONDS) {
        await onStopRecording();
      }
    };
    run();
  }, [elapsedTime]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      if (recording) {
        await recording.stopAndUnloadAsync();
      }

      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation, recording]);

  const onStopRecording = async () => {
    if (!recording) {
      setErrorCode(ErrorCode.Other);
      setStatus(RecordStatus.Error);
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      if (elapsedTime < MIN_RECORDING_SECONDS) {
        setErrorCode(ErrorCode.ShortRecording);
        setStatus(RecordStatus.Error);
        return;
      }
      const uri = recording.getURI();
      if (!uri) {
        setErrorCode(ErrorCode.Other);
        setStatus(RecordStatus.Error);
        return;
      }
      voiceUrl.current = uri;
      setStatus(RecordStatus.Translating);
    } catch (error) {
      console.error(error);
      setStatus(RecordStatus.Error);
    }
  };

  const soundWave = useRef<LottieView>(null);

  useEffect(() => {
    if (soundWave.current && isRecording) {
      soundWave.current.play();
    }
  }, [soundWave.current, isRecording]);

  return (
    <TemplateView
      background="dark"
      className="flex flex-col items-center gap-y-2 px-6 pb-8 pt-[136px]"
    >
      <Icon name="microphone" color="#F1AD5A" size={48} />

      <Text className="font-nunito-bold text-[28px] text-white">
        Recording your cat...
      </Text>

      <View className="flex flex-1 flex-col justify-center">
        {elapsedTime <= 2 ? (
          <LottieView
            ref={soundWave}
            style={{
              width: width,
              height: (width * 111) / 393,
            }}
            source={require(`../../assets/components/sound_wave_grow.json`)}
          />
        ) : (
          <LottieView
            style={{
              width: width,
              height: (width * 111) / 393,
            }}
            source={require(`../../assets/components/sound_wave.json`)}
            autoPlay
          />
        )}
      </View>

      <View className="mb-24">
        <Text className="font-nunito-bold text-[24px] text-white">
          {`${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`}
        </Text>
      </View>

      <Button
        title="Stop recording"
        onPress={() => {
          onStopRecording();
        }}
        variant="outline"
      />
    </TemplateView>
  );
}
