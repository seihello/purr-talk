import React from "react";
import { Dimensions, View } from "react-native";
import Logo from "./components/init/logo";
import Button from "./components/ui/button";
import Text from "./components/ui/text";

export default function InitPage({ navigation }: any) {
  const { width } = Dimensions.get("window");

  return (
    <View className="flex h-screen w-screen flex-col pt-16">
      <Logo
        width={width}
        height={325 * (width / 375)}
        style={{
          transform: `scale(${width / 375})`,
        }}
      />
      <View className="flex flex-1 flex-col justify-start gap-y-4 px-8 py-16">
        <Text className="text-center font-dm-bold text-[32px] leading-[41.66px] text-gray-900">
          Design x English{"\n"}= Your success
        </Text>
        <Text className="text-center font-dm-bold leading-[20.83px] text-gray-900 mb-4">
          Our mission is to help your designer{"\n"}
          career thrive anywhere you are.
        </Text>
        <Button
          title="Start"
          onPress={() => {
            navigation.push("Home");
          }}
          className="bg-primary-900"
        />
      </View>
    </View>
  );
}
