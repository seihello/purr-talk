import * as d3 from "d3-array";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import ProgressType from "../enums/progress-type";
import ProgressBar, { ColorType } from "./components/word/progress-bar";
import WordMeaningSide from "./components/word/word-meaning-side";
import WordTitleSide from "./components/word/word-title-side";
import Progress from "./enum/progress.enum";
import getWordsByIds from "./lib/progress/get-words-by-ids";
import updateWordProgress from "./lib/progress/update-word-progress";
import Word from "./types/word.type";

export default function WordPage({ navigation, route }: any) {
  const { wordIds, phaseName } = route.params;
  const [words, setWords] = useState<Word[]>([]);
  const [isTitleSide, setIsTitleSide] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewingCount, setReviewingCount] = useState(0);
  const [learningCount, setLearningCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const toNext = () => {
    const finishCourse = () => {
      navigation.push("Home");
    };

    if (activeIndex < words.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      finishCourse();
    }

    setIsTitleSide(true);
  };

  const showMeaning = () => {
    setIsTitleSide(false);
  };

  const updateProgress = async (wordId: number, progress: Progress) => {
    try {
      await updateWordProgress(wordId, progress);
      const newWords = words.map((word: Word) => {
        return word.id === wordId ? { ...word, progress } : word;
      });
      setWords(newWords);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const words = await getWordsByIds(wordIds);
        setWords(d3.shuffle(words));

        navigation.setOptions({ headerTitle: phaseName });

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isTitleSide ? "#FFFFFF" : "#F1FBFB",
      },
    });
  }, [isTitleSide]);

  useEffect(() => {
    let masteredCount = 0;
    let reviewingCount = 0;
    let learningCount = 0;
    for (const word of words) {
      switch (word.progress) {
        case Progress.Mastered:
          masteredCount += 1;
          break;
        case Progress.Reviewing:
          reviewingCount += 1;
          break;
        case Progress.Learning:
          learningCount += 1;
          break;
        default:
          break;
      }
    }
    setMasteredCount(masteredCount);
    setReviewingCount(reviewingCount);
    setLearningCount(learningCount);
  }, [words]);

  if (isLoading || words.length === 0) return;
  const word = words[activeIndex];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="h-screen w-full"
      style={{
        backgroundColor: isTitleSide ? "white" : "#F1FBFB",
      }}
    >
      <View className="flex w-full flex-col px-4 py-6">
        {isTitleSide ? (
          <WordTitleSide word={word} showMeaning={showMeaning} />
        ) : (
          <WordMeaningSide
            word={word}
            updateProgress={updateProgress}
            toNext={toNext}
          />
        )}
        <View className="flex flex-col">
          <ProgressBar
            type={ProgressType.Mastered}
            colorType={isTitleSide ? ColorType.Gray : ColorType.White}
            total={words.length}
            count={masteredCount}
            isHome={false}
          />
          <ProgressBar
            type={ProgressType.Reviewing}
            colorType={isTitleSide ? ColorType.Gray : ColorType.White}
            total={words.length}
            count={reviewingCount}
            isHome={false}
          />
          <ProgressBar
            type={ProgressType.Learning}
            colorType={isTitleSide ? ColorType.Gray : ColorType.White}
            total={words.length}
            count={learningCount}
            isHome={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}
