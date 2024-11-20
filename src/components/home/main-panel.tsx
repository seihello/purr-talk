import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import getAllCategories from "../../lib/categories/get-all-categories";
import getAllPhases from "../../lib/phases/get-all-phases";
import getAllWordInfo from "../../lib/progress/get-all-word-info";
import getWordProgress from "../../lib/progress/get-word-progress";
import Category from "../../types/category.type";
import Phase from "../../types/phase.type";
import WordInfo from "../../types/word-info.type";
import Text from "../ui/text";
import CourseCard from "./course-card";
import CourseCardsSkeleton from "./course-cards-skeleton";

export default function HomeMainPanel({ navigation }: any) {
  const isFocused = useIsFocused();

  const [wordInfoList, setWordInfoList] = useState<WordInfo[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [isLoadingInitialData, setIsLoadingInitialData] =
    useState<boolean>(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState<boolean>(false);
  const [workingPhaseId, setWorkingPhaseId] = useState<number>();

  useEffect(() => {
    const run = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
        const phases = await getAllPhases();
        setPhases(phases);
        const wordInfoList = await getAllWordInfo();
        setWordInfoList(wordInfoList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (isFocused && workingPhaseId !== undefined) {
        try {
          const newWordInfoList = [...wordInfoList];
          for (const newWordInfo of wordInfoList) {
            if (newWordInfo.phaseIds.includes(workingPhaseId)) {
              const newProgress = await getWordProgress(newWordInfo.id);
              newWordInfo.progress = newProgress;
            }
          }
          setWordInfoList(newWordInfoList);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingProgress(false);
        }
      }
    };
    run();
  }, [isFocused]);

  // Filtered word IDs for each phase
  const filteredWordInfoList: Array<Array<WordInfo>> = [];
  for (let i = 0; i < phases.length; i++) {
    filteredWordInfoList.push(
      wordInfoList.filter((wordInfo) => wordInfo.phaseIds.includes(i)),
    );
  }

  // Just in case
  if (filteredWordInfoList.length !== phases.length) return;

  return (
    <View className="flex flex-col items-center rounded-[40px] bg-white px-5 pb-8 pt-2">
      <Text className="my-6 font-dm-bold text-[28px]">Vocab being learned</Text>
      {isLoadingInitialData ? (
        <CourseCardsSkeleton />
      ) : (
        <>
          {phases.length > 0 ? (
            <View className="mt-2 w-full">
              {phases.map((phase, index) => (
                <CourseCard
                  key={index}
                  navigation={navigation}
                  categoryId={selectedCategoryId}
                  phase={phase}
                  wordInfoList={filteredWordInfoList[index]}
                  setWorkingPhaseId={setWorkingPhaseId}
                />
              ))}
            </View>
          ) : (
            <Text>No courses for this category.</Text>
          )}
        </>
      )}
    </View>
  );
}
