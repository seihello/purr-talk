import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "./text";

type Props = {
  title: string;
  onPress: () => void;
  className?: string;
  variant?: "default" | "outline";
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  className,
  variant = "default",
  disabled = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex h-12 w-full items-center justify-center rounded-[52px] ${
        variant === "default" ? "bg-primary-900" : "bg-white"
      } ${disabled ? "opacity-50" : ""}`.concat(className || "")}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={`flex w-auto flex-row items-center justify-center font-nunito-bold text-base ${
          variant === "default" ? "text-white" : "text-primary-900"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
