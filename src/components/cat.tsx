import LottieView from "lottie-react-native";
import React from "react";
import { Image, View, ViewProps } from "react-native";
import FurColor from "../enum/fur-color.enum";
import CAT_ANIMATIONS from "../lib/cats/cat-animations";

type Props = {
  furColor: FurColor;
  facePosition: "right" | "left";
} & ViewProps;

export default function Cat({ furColor, facePosition, ...props }: Props) {
  return (
    <View {...props}>
      <View
        className="relative"
        style={{
          width: 283,
          height: 120,
          transform: [{ scaleX: facePosition === "right" ? -1 : 1 }],
        }}
      >
        <Image
          source={require("../../assets/cats/mat.png")}
          style={{
            width: 252,
            height: 25,
            transform: [{ translateX: 22 }, { translateY: -24 }],
            position: "absolute",
            bottom: 0,
          }}
        />
        <LottieView
          source={CAT_ANIMATIONS[furColor]}
          style={{
            width: 283,
            height: 120,
            transform: [{ translateY: -30 }],
            position: "absolute",
          }}
          autoPlay
        />
      </View>
    </View>
  );
}
