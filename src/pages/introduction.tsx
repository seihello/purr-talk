import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/ui/button";
import Text from "../components/ui/text";

export default function IntroductionPage({ navigation }: any) {
  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView
      className="h-screen w-screen"
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={true}
    >
      <View className="flex min-h-screen flex-col items-center px-4 pb-8 pt-12">
        <View className="flex grow items-center justify-end">
          <Image
            source={require(`../../assets/img/chatting_cats.png`)}
            style={{
              width: width * 0.9,
              height: (width * 0.9 * 309) / 360,
            }}
          />
        </View>
        <View className="mb-2 flex grow flex-col justify-end pb-2">
          <Text className="flex justify-start font-nunito-bold text-[30px]">
            How Translation Works
          </Text>
        </View>

        <View className="flex w-full flex-col space-y-2">
          <View className="flex w-full flex-col gap-y-4 rounded-xl border border-gray-300 bg-[#F4EAE1] px-6 pb-6 pt-2">
            <View className="flex flex-row items-center gap-x-2">
              <Icon name="microphone" color="#4651D1" size={36} />
              <Text className="font-nunito-bold text-[24px]">Record</Text>
            </View>
            <Text className="font-nunito-semibold text-[16px]">
              <Text className="font-nunito-bold text-primary-900">
                Got a talkative kitty?
              </Text>{" "}
              Record their meows and translate to human language!
            </Text>
          </View>

          <View className="mb-2 flex w-full flex-col gap-y-4 rounded-xl border border-gray-300 bg-primary-500 px-6 pb-6 pt-2">
            <View className="flex flex-row items-center gap-x-2">
              <Icon name="upload" color="#4651D1" size={36} />
              <Text className="font-nunito-bold text-[24px]">Upload</Text>
            </View>
            <Text className="font-nunito-semibold text-[16px]">
              <Text className="font-nunito-bold text-primary-900">
                Have a camera-shy cat?
              </Text>{" "}
              Upload a video and discover their hidden messages!
            </Text>
          </View>
        </View>

        <Button
          title="Get started"
          onPress={() => {
            navigation.push("Home");
          }}
        />
      </View>
    </ScrollView>
  );
}
