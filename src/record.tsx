import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./components/ui/button";
import Text from "./components/ui/text";
enum Status {
  Recording,
  Translating,
}

const PAWS_NUM = 13;
const PAWS_CIRCLE_WIDTH = 0.5;

export default function RecordPage({ navigation, route }: any) {
  const [status, setStatus] = useState(Status.Recording);

  const { width } = Dimensions.get("window");
  // console.log("width", width);

  const [numPaws, setNumPaws] = useState(0);
  const [translation, setTranslation] = useState("");

  const paws = [
    ...Array(status === Status.Translating && translation ? PAWS_NUM : numPaws),
  ].map((_, i) => {
    const { x, y } = getPawCoordinates(i, width);
    return { x, y };
  });

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

  // useEffect(() => {
  //   if (route.name !== "Record") {
  //     setNumPaws(0);
  //   }
  // }, [route.name]);

  useEffect(() => {
    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (status === Status.Translating && translation) {
        navigation.replace("Translation", {
          // translation:
          //   "Meow! I’m hungry. Give me some tuna! Meow! I’m hungry. Give me some tuna! Meow! I’m hungry. Give me some!",
          translation: translation,
        });
      }
    };
    run();
  }, [status, translation]);

  const translate = async () => {
    setStatus(Status.Translating);

    // TODO: Call API to translate the voice
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const response = await fetch(
      "https://purr-talk-server.vercel.app/api/get-random-number",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          length: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
        }),
      },
    );
    const { data } = await response.json();
    console.log("data", data);
    setTranslation(data);
  };

  switch (status) {
    case Status.Recording:
      return (
        <View className="flex h-full flex-1 flex-col items-center gap-y-2 bg-primary-900 px-6 pb-8 pt-16">
          <Icon name="microphone" color="#F1AD5A" size={48} />
          <Text className="font-nunito-bold text-[28px] text-white">
            Recording your cat...
          </Text>
          <View className="flex flex-1 flex-col justify-center">
            <Image
              source={require(`../assets/img/two_tone_wave.png`)}
              style={{
                width: width,
                height: (width * 111) / 393,
              }}
            />
          </View>
          <View className="mb-24">
            <Text className="font-nunito-bold text-[24px] text-white">
              00.20.30
            </Text>
          </View>
          <Button
            title="Stop recording"
            onPress={() => {
              translate();
            }}
            variant="outline"
          />
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
              // <Text
              //   key={i}
              //   className="absolute text-black"
              //   style={{
              //     left: paw.x,
              //     top: paw.y,
              //     transform: [{ translateX: -5 }, { translateY: -5 }],
              //   }}
              // >
              //   {i}
              // </Text>
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
