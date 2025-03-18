import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import RecordStatus from "../enum/record-status.enum";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
  setTranslation: React.Dispatch<React.SetStateAction<string>>;
  voiceUrl: React.MutableRefObject<string>;
};

export default function RecordingView({
  setStatus,
  setTranslation,
  voiceUrl,
}: Props) {
  const { width } = Dimensions.get("window");

  const [isRecording, setIsRecording] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState<Audio.Recording>();

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  useEffect(() => {
    setTranslation("");
    voiceUrl.current = "";
  }, []);

  useEffect(() => {
    const record = async () => {
      if (!permissionResponse) return;
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        const newPermissionResponse = await requestPermission();
        if (newPermissionResponse.status !== "granted") {
          return;
        }
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting to record");
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      console.log("Started recording");
      setRecording(recording);
    };
    record();
  }, [permissionResponse, permissionResponse?.status]);

  useEffect(() => {
    let interval: any;

    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const onStopRecording = async () => {
    console.log("Stop recording");
    if (!recording) return;
    setStatus(RecordStatus.Translating);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Stored at", uri);
      if (uri) {
        voiceUrl.current = uri;
        setStatus(RecordStatus.Translating);
      } else {
        setStatus(RecordStatus.Error);
      }
    } catch (error) {
      console.log(error);
      setStatus(RecordStatus.Error);
    }
  };

  if (!permissionResponse) return;

  return (
    <View className="flex h-full flex-1 flex-col items-center gap-y-2 bg-primary-900 px-6 pb-8 pt-16">
      <Icon name="microphone" color="#F1AD5A" size={48} />
      {permissionResponse.status === "granted" ? (
        <Text className="font-nunito-bold text-[28px] text-white">
          Recording your cat...
        </Text>
      ) : (
        <Text className="text-center font-nunito-semibold text-[16px] text-white">
          Please enable microphone access for our app in your device's settings.
        </Text>
      )}

      {permissionResponse.status === "granted" && (
        <>
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
        </>
      )}
    </View>
  );
}
