import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../components/ui/text";
import ErrorCode from "../enum/error-code.enum";
import RecordStatus from "../enum/record-status.enum";
import useProfile from "../hooks/use-profile";

const PAWS_NUM = 13;
const PAWS_CIRCLE_WIDTH = 0.5;

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
  setErrorCode: React.Dispatch<React.SetStateAction<ErrorCode>>;
  translation: string;
  setTranslation: React.Dispatch<React.SetStateAction<string>>;
  voiceUrl: React.MutableRefObject<string>;
};

export default function TranslatingView({
  setStatus,
  setErrorCode,
  translation,
  setTranslation,
  voiceUrl,
}: Props) {
  const { width } = Dimensions.get("window");
  const { profile } = useProfile();

  const [numPaws, setNumPaws] = useState(0);

  useEffect(() => {
    const translate = async () => {
      if (voiceUrl.current) {
        try {
          // const formData = new FormData();
          // formData.append("file", {
          //   uri: voiceUrl.current.replace("file://", ""),
          //   name: "audio.m4a",
          //   type: "audio/m4a",
          // });
          // formData.append("hoge", fuga);

          // Call API to translate the voice
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const response = await axios.post(
            "https://purr-talk-server.vercel.app/api/translate",
            // "http://localhost:3000/api/translate",
            // formData,
            {
              headers: {
                // "Content-Type": "multipart/form-data",
                "Content-Type": "application/json",
              },
              data: {
                userName: profile?.name,
              },
            },
          );

          setTranslation(response.data.message);

          await new Promise((resolve) => setTimeout(resolve, 800));

          setStatus(RecordStatus.Translated);
        } catch (error) {
          console.error(error);
          setErrorCode(ErrorCode.Network);
          setStatus(RecordStatus.Error);
        }
      }
    };

    translate();
  }, [voiceUrl.current]);

  useEffect(() => {
    let interval: any;
    if (!translation) {
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
  }, []);

  const paws = [...Array(translation ? PAWS_NUM : numPaws)].map((_, i) => {
    const { x, y } = getPawCoordinates(i, width);
    return { x, y };
  });

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
        {translation && <Icon name="check" color="white" size={76} />}
      </View>
    </View>
  );
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

  return { x, y };
}
