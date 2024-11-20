import React from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";
import Category from "../../types/category.type";
import Text from "../ui/text";

type Props = {
  categories: Category[];
  selectedCategoryId: number;
  setSelectedCategoryId: (value: number) => void;
};

export default function CategoryChips({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4 flex"
      style={{ maxHeight: 32 }}
      contentContainerStyle={{ justifyContent: "flex-start" }}
    >
      <View className="flex flex-row gap-x-2">
        <TouchableHighlight
          onPress={() => setSelectedCategoryId(-1)}
          underlayColor="white"
        >
          <View
            className={`rounded-full px-4 py-2 ${
              selectedCategoryId === -1 ? "bg-primary-900" : "bg-primary-100"
            }`}
          >
            <Text
              className={`font-dm-bold ${
                selectedCategoryId === -1
                  ? "text-primary-100"
                  : "text-primary-900"
              }`}
            >
              All
            </Text>
          </View>
        </TouchableHighlight>

        {categories.map((category, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => setSelectedCategoryId(category.id)}
            underlayColor="white"
          >
            <View
              className={`rounded-full px-4 py-2 ${
                category.id === selectedCategoryId
                  ? "bg-primary-900"
                  : "bg-primary-100"
              }`}
            >
              <Text
                className={`font-dm-bold ${
                  category.id === selectedCategoryId
                    ? "text-primary-100"
                    : "text-primary-900"
                }`}
              >
                {category.name}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </ScrollView>
  );
}
