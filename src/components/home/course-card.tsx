import React from "react";
import { Alert, Image, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressType from "../../../enums/progress-type";
import Progress from "../../enum/progress.enum";
import resetWordProgress from "../../lib/progress/reset-word-progress";
import Phase from "../../types/phase.type";
import WordInfo from "../../types/word-info.type";
import Text from "../ui/text";
import ProgressBar, { ColorType } from "../word/progress-bar";

const PHASE_IMAGES = {
  1: require(`../../../assets/img/phases/1.png`),
  2: require(`../../../assets/img/phases/2.png`),
  3: require(`../../../assets/img/phases/3.png`),
  4: require(`../../../assets/img/phases/4.png`),
  5: require(`../../../assets/img/phases/5.png`),
};

type Props = {
  navigation: any;
  categoryId: number;
  phase: Phase;
  wordInfoList: WordInfo[];
  setWorkingPhaseId: (value: number) => void;
};

export default function CourseCard({
  navigation,
  categoryId,
  phase,
  wordInfoList,
  setWorkingPhaseId,
}: Props) {
  const reset = async () => {
    Alert.alert("Reset progress", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Reset"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await resetWordProgress();
          // await setProgress();
        },
      },
    ]);
  };

  const masteredCount = wordInfoList.filter(
    (wordInfo) => wordInfo.progress === Progress.Mastered,
  ).length;

  return (
    <View className="mb-4 flex h-[90px] flex-col">
      <TouchableHighlight
        onPress={() => {
          setWorkingPhaseId(phase.id);
          navigation.push("Word", {
            wordIds: wordInfoList.map((wordInfo) => wordInfo.id),
            phaseName: phase.name,
          });
        }}
        onLongPress={reset}
        underlayColor="white"
        className="h-full w-full grow"
      >
        <View className="flex w-full grow flex-row items-center justify-between overflow-hidden rounded-xl border border-primary-300 bg-primary-100">
          <Image
            source={
              phase.id === 0
                ? PHASE_IMAGES[1]
                : phase.id === 1
                  ? PHASE_IMAGES[2]
                  : phase.id === 2
                    ? PHASE_IMAGES[3]
                    : phase.id === 3
                      ? PHASE_IMAGES[4]
                      : PHASE_IMAGES[5]
            }
            className="h-[90px] w-[90px]"
          />
          <View className="flex w-1 grow flex-row items-center justify-between gap-x-3 py-2 pl-4 pr-3">
            <View className="flex grow flex-col">
              <Text className="font-dm-bold text-lg">{phase.name}</Text>
              <ProgressBar
                type={ProgressType.Mastered}
                colorType={ColorType.White}
                total={wordInfoList.length}
                count={masteredCount}
                isHome={true}
              />
            </View>
            <Icon name="chevron-right" color="#239CAC" size={32} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}
