import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "./text";

type Props = {
  title: string;
  onPress: () => void;
  className?: string;
  variant?: "default" | "outline";
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
        variant === "default" ? "bg-primary-900" : "bg-white"
      } ${disabled ? "opacity-50" : ""}`.concat(className || "")}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      {icon && <View className="absolute left-6">{icon}</View>}
      <Text
        className={`flex w-auto flex-row items-center justify-center font-nunito-bold text-[18px] ${
          variant === "default" ? "text-white" : "text-primary-900"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
