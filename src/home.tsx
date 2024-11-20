import React from "react";
import { ScrollView, View } from "react-native";
import HomeMainPanel from "./components/home/main-panel";
import Mv from "./components/home/mv";
import Text from "./components/ui/text";

export default function HomePage(props: any) {
  return (
    <View className="flex h-screen w-full flex-col justify-between bg-primary-900 pt-16">
      <View className="relative flex h-48 flex-col justify-center">
        {/* <Image
          source={require("../assets/mv.png")}
          className="absolute right-8 top-8 h-[45vw] w-[50vw]"
        /> */}
        <Mv className="absolute right-0 top-2 scale-[0.8]" />
        {/* <View className="flex flex-row justify-end p-4">
          <View className="flex flex-col">
            <View className="flex items-center justify-center rounded-full bg-white p-1">
              <Icon name="account" color="#239CAC" size={32} />
            </View>
          </View>
        </View> */}
        <View className="absolute left-12 top-20 w-[180px]">
          <View className="flex h-12 flex-col justify-center">
            <Text className="font-dm-bold text-[32px] text-white">
              {/* Welcome, Lisa! */}
              Hi!
            </Text>
          </View>
          <Text className="mt-2 font-dm-bold text-lg leading-[20.83px] text-white">
            What do you want to learn today?
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="absolute h-screen w-full"
      >
        <View className="flex min-h-screen w-full flex-col">
          <View className="min-h-[280px] grow"></View>
          <HomeMainPanel navigation={props.navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
