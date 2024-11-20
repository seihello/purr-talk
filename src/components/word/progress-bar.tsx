import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import ProgressType from "../../../enums/progress-type";
import Text from "../ui/text";

export enum ColorType {
  White,
  Gray,
}

type Props = {
  type: ProgressType;
  count: number;
  total: number;
  colorType: ColorType;
  isHome: boolean;
};

export default function ProgressBar({
  type,
  total,
  count,
  colorType,
  isHome,
}: Props) {
  const transitWidth = useRef(
    new Animated.Value(Math.round((count / total) * 100)),
  ).current;

  const updateWidth = (width: number) => {
    Animated.timing(transitWidth, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    updateWidth(Math.round((count / total) * 100));
  }, [total, count]);

  const bgColor =
    type === ProgressType.Mastered
      ? "bg-primary-900"
      : type === ProgressType.Reviewing
        ? "bg-warning-900"
        : type === ProgressType.Learning
          ? "bg-error-900"
          : "";

  return (
    <View className={isHome ? "mt-1" : "mt-4"}>
      <View className="flex flex-row justify-between">
        <Text className="font-roboto text-xs text-gray-700">{`${count}/${total} ${type.toString()}`}</Text>
        <Text className="font-roboto text-xs text-gray-700">{`${Math.round(
          (count / total) * 100,
        )}%`}</Text>
      </View>
      <View
        className={`mt-1 h-2 w-full overflow-hidden rounded-full ${
          colorType === ColorType.White ? "bg-white" : "bg-gray-200"
        } ${colorType === ColorType.White ? "border border-gray-300" : ""}`}
      >
        <Animated.View
          className={`h-2 ${bgColor}`}
          style={{
            // width: `${Math.round((count / total) * 100)}%`,
            width: transitWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          }}
        ></Animated.View>
      </View>
    </View>
  );
}
