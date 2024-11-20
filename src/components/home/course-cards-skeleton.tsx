import { Skeleton } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export default function CourseCardsSkeleton() {
  return (
    <View className="flex w-full flex-col gap-y-4 pb-4 pt-2">
      <Skeleton
        height={90}
        width={300}
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 16,
          opacity: 0.2,
        }}
      />
      <Skeleton
        height={90}
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 16,
          opacity: 0.2,
        }}
      />
      <Skeleton
        height={90}
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 16,
          opacity: 0.2,
        }}
      />
      <Skeleton
        height={90}
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 16,
          opacity: 0.2,
        }}
      />
    </View>
  );
}
