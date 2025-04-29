import clsx from "clsx";
import React from "react";
import { View, ViewProps } from "react-native";

type Props = {
  background: "dark" | "light";
};

export default function TemplateView({
  background,
  children,
  className,
  ...rest
}: ViewProps & Props) {
  return (
    <View
      className={`flex-1 pt-8 ${
        background === "dark" ? "bg-primary-900" : "bg-primary-300"
      }`}
    >
      <View className={clsx("w-full flex-1", className)} {...rest}>
        {children}
      </View>
    </View>
  );
}
