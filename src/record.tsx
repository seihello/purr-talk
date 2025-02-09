import axios from "axios";
import { Audio } from "expo-av";
import FormData from "form-data";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
import useProfile from "./hooks/use-profile";

enum Status {
  Recording,
  Translating,
}

const PAWS_NUM = 13;
const PAWS_CIRCLE_WIDTH = 0.5;

export default function RecordPage({ navigation, route }: any) {
  const { width } = Dimensions.get("window");
  // console.log("width", width);

  const { profile } = useProfile();
  const [status, setStatus] = useState(Status.Recording);

  const [recording, setRecording] = useState<Audio.Recording>();
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const voiceUrl = useRef<string>("");

  const [numPaws, setNumPaws] = useState(0);
  const [translation, setTranslation] = useState("");

  const [elapsedTime, setElapsedTime] = useState(0);

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

    if (status === Status.Recording && isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, isRecording]);

  useEffect(() => {
    let interval: any;
    if (status === Status.Translating && !translation) {
      interval = setInterval(() => {
        setNumPaws((prevNumPaws) => {
          if (prevNumPaws === PAWS_NUM) {
            return 1;
          }
          return prevNumPaws + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (status === Status.Translating && translation) {
        navigation.replace("Translation", {
          voiceUrl: voiceUrl.current || "",
          translation: translation,
        });
      }
    };
    run();
  }, [status, translation]);

  const onStopRecording = async () => {
    try {
      console.log("Stop recording");
      if (!recording) return;

      setStatus(Status.Translating);

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Stored at", uri);
      // const hoge = await recording.createNewLoadedSoundAsync();
      // hoge.sound.playAsync();
      if (uri) {
        voiceUrl.current = uri;

        const formData = new FormData();
        formData.append("file", {
          uri: uri.replace("file://", ""),
          name: "audio.m4a",
          type: "audio/m4a",
        });

        // TODO: Call API to translate the voice
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.post(
          "https://purr-talk-server.vercel.app/api/translate",
          // "http://localhost:3000/api/translate",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log("data", response.data);

        setTranslation(response.data.message);
      }
    } catch (error) {
      console.log(error);
      navigation.replace("Home");
    }
  };

  const paws = [
    ...Array(status === Status.Translating && translation ? PAWS_NUM : numPaws),
  ].map((_, i) => {
    const { x, y } = getPawCoordinates(i, width);
    return { x, y };
  });

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  if (!permissionResponse) return;

  switch (status) {
    case Status.Recording:
      return (
        <View className="flex h-full flex-1 flex-col items-center gap-y-2 bg-primary-900 px-6 pb-8 pt-16">
          <Icon name="microphone" color="#F1AD5A" size={48} />
          {permissionResponse.status === "granted" ? (
            <Text className="font-nunito-bold text-[28px] text-white">
              Recording your cat...
            </Text>
          ) : (
            <Text className="text-center font-nunito-semibold text-[16px] text-white">
              Please enable microphone access for our app in your device's
              settings.
            </Text>
          )}

          {permissionResponse.status === "granted" && (
            <>
              <View className="flex flex-1 flex-col justify-center">
                <Image
                  source={require(`../assets/img/white_pink_wave.png`)}
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

    case Status.Translating:
      return (
        <View className="flex h-screen w-full flex-col items-center gap-y-16 bg-primary-900 pt-[120px]">
          <View className="mb-4 px-12">
            <Text className="text-center font-nunito-bold text-[28px] text-white">
              Turning meows into human words...
            </Text>
          </View>
          <View
            className="relative flex w-full items-center justify-center"
            style={{
              height: width * PAWS_CIRCLE_WIDTH,
            }}
          >
            {paws.map((paw, i) => (
              <View
                key={i}
                className="absolute"
                style={{
                  left: paw.x,
                  top: paw.y,
                  transform: [
                    { translateX: -16 },
                    { translateY: -16 },
                    { rotate: `${90 + 360 * (i / PAWS_NUM)}deg` },
                  ],
                }}
              >
                <Icon name="paw" color="white" size={32} />
              </View>
            ))}
            {status === Status.Translating && translation && (
              <Icon name="check" color="white" size={76} />
            )}
          </View>
        </View>
      );
  }
}

function getPawCoordinates(
  index: number,
  screenWidth: number,
): { x: number; y: number } {
  if (index < 0 || index > PAWS_NUM - 1) {
    throw new Error(`Index must be between 1 and ${PAWS_NUM}`);
  }

  // const diameter = Math.min(screenWidth * 0.8, 400);
  const diameter = screenWidth * PAWS_CIRCLE_WIDTH;

  // Calculate radius and center coordinates of the circle
  const radius = diameter / 2;

  // Calculate the angle for the current icon
  const angle = ((2 * Math.PI) / PAWS_NUM) * index - Math.PI / 2;

  // Calculate the icon's coordinates
  const x = radius + radius * Math.cos(angle) + (screenWidth - diameter) / 2;
  const y = radius + radius * Math.sin(angle);

  // console.log(`${centerX}, ${centerY}, ${radius}, ${Math.sin(angle)}`);
  // console.log(`${index}: (${x}, ${y}) ${angle}`);

  return { x, y };
}
