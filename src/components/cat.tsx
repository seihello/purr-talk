import LottieView from "lottie-react-native";
import React from "react";
import { Image, View, ViewProps } from "react-native";
import FurColor from "../enum/fur-color.enum";
import CAT_ANIMATIONS from "../lib/cats/cat-animations";

type Props = {
  furColor: FurColor;
} & ViewProps;

export default function Cat({ furColor, ...props }: Props) {
  return (
    <View {...props}>
      <View
        className="relative"
        style={{
          width: 283,
          height: 120,
          transform: [{ scaleX: -1 }],
        }}
      >
        <Image
          source={require("../../assets/cats/mat.png")}
          style={{
            width: 252,
            height: 25,
            transform: [{ translateX: 24 }, { translateY: -24 }],
            position: "absolute",
            bottom: 0,
          }}
        />
        <LottieView
          source={CAT_ANIMATIONS[furColor]}
          style={{
            width: 283,
            height: 120,
            transform: [{ translateY: -32 }],
            position: "absolute",
          }}
          autoPlay
        />
      </View>
    </View>
  );
}
