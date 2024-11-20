import React from "react";
import { View } from "react-native";
import Progress from "../../enum/progress.enum";
import Word from "../../types/word.type";
import Button from "../ui/button";
import Chip from "../ui/chip";
import Text from "../ui/text";

type Props = {
  word: Word;
  updateProgress: (wordId: number, progress: Progress) => Promise<void>;
  toNext: () => void;
};

export default function WordMeaningSide({
  word,
  updateProgress,
  toNext,
}: Props) {
  const onPressedKnown = async () => {
    switch (word.progress) {
      case Progress.New:
        await updateProgress(word.id, Progress.Mastered);
        break;
      case Progress.Learning:
        await updateProgress(word.id, Progress.Reviewing);
        break;
      case Progress.Reviewing:
        await updateProgress(word.id, Progress.Mastered);
        break;
      case Progress.Mastered:
      default:
        // do nothing
        // Mastered words should not disappear
        break;
    }
    toNext();
  };

  const onPressedUnknown = async () => {
    switch (word.progress) {
      case Progress.New:
        await updateProgress(word.id, Progress.Learning);
        break;
      case Progress.Learning:
        break;
      case Progress.Reviewing:
        await updateProgress(word.id, Progress.Learning);
        break;
      case Progress.Mastered:
        await updateProgress(word.id, Progress.Reviewing);
        break;
      default:
        // do nothing
        // Mastered words should not disappear?
        break;
    }
    toNext();
  };

  return (
    <View className="items-between flex flex-col space-y-4 rounded-2xl border-[1px] border-gray-200 bg-white px-8 pb-8 pt-10">
      <View className="flex flex-col items-center">
        <Text className="font-dm-bold text-[32px] leading-[41.66px] text-gray-900">
          {word.title}
        </Text>
        <Text className="font-roboto-italic tracking-wide text-primary-900">
          {word.ipa}
        </Text>
      </View>

      <View className="flex flex-col gap-y-2">
        <Text className="w-full text-left font-dm-bold text-base text-gray-700">
          [{word.parts.join(" / ")}]
        </Text>
        <Text className="font-roboto leading-[20px] text-gray-900">
          {word.meaning}
        </Text>
      </View>

      {word.synonyms.length > 0 && (
        <View className="flex flex-col gap-y-2">
          <Text className="w-full text-left font-dm-bold text-base text-gray-700">
            Synonym
          </Text>

          <View className="flex flex-row flex-wrap gap-x-1 gap-y-1">
            {word.synonyms.map((synonym: string, index: number) => (
              <Chip key={index}>{synonym}</Chip>
            ))}
          </View>
        </View>
      )}

      <View className="flex flex-col gap-y-2">
        <Text className="w-full text-left font-dm-bold text-base text-gray-700">
          Example
        </Text>
        {word.sentences.map((sentence: string, index: number) => (
          <Text
            key={index}
            className="font-roboto-italic leading-[20px] text-gray-900"
          >
            {sentence}
          </Text>
        ))}
      </View>

      <View className="flex w-full flex-col gap-y-4">
        <Button
          title="I knew this word"
          onPress={onPressedKnown}
          className="bg-primary-900"
        />
        <Button
          title="I didn't know this word"
          onPress={onPressedUnknown}
          className="bg-error-900"
        />
      </View>
    </View>
  );
}
