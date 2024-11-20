import React from "react";
import { View } from "react-native";
import Word from "../../types/word.type";
import Button from "../ui/button";
import Text from "../ui/text";

type Props = {
  word: Word;
  showMeaning: () => void;
};

export default function WordTitleSide({ word, showMeaning }: Props) {
  return (
    <View className="relative flex flex-col items-center justify-between rounded-2xl border-[1px] border-gray-200 bg-primary-100 px-8">
      <Text className="my-10 font-dm-bold text-[32px] leading-[41.66px]">
        {word.title}
      </Text>
      <Button
        className="mb-8 bg-primary-900"
        title="See the definition"
        onPress={() => {
          showMeaning();
        }}
      />
    </View>
  );
}
