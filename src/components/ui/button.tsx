import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "./text";

type Props = {
  title: string;
  onPress: () => void;
  className?: string;
  variant?: "default" | "outline" | "upcoming";
  disabled?: boolean;
  icon?: React.ReactNode;
};

export default function Button({
  title,
  onPress,
  className,
  variant = "default",
  disabled = false,
  icon,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`relative flex h-[56px] w-full items-center justify-center rounded-[52px] ${
        variant === "default"
          ? "bg-primary-900"
          : variant === "outline"
            ? "white"
            : "bg-[#E8E8E8]"
      } ${disabled && variant !== "upcoming" ? "opacity-50" : ""}`.concat(
        className || "",
      )}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      {icon && <View className="absolute left-6">{icon}</View>}
      <Text
        className={`flex w-auto flex-row items-center justify-center font-nunito-bold text-[18px] ${
          variant === "default"
            ? "text-white"
            : variant === "outline"
              ? "text-primary-900"
              : "text-[#8B8A95]"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
