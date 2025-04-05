import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import { MIN_RECORDING_SECONDS } from "../constants";
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

  return (
    <View className="flex h-screen flex-1 flex-col items-center gap-y-2 bg-primary-900 px-6 pb-8 pt-16">
      <Icon name="microphone" color="#F1AD5A" size={48} />

      <Text className="font-nunito-bold text-[28px] text-white">
        Recording your cat...
      </Text>

      <View className="flex flex-1 flex-col justify-center">
        <Image
          source={require(`../../assets/img/white_pink_wave.png`)}
          style={{
            width: width,
            height: (width * 111) / 393,
          }}
        />
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
    </View>
  );
}
