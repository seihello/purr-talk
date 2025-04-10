import clsx from "clsx";
import { Text as ReactNativeText, TextProps } from "react-native";

export default function Text(props: TextProps) {
  // const { ...rest } = props;

  return (
    <ReactNativeText
      {...props}
      className={clsx(
        "text-center font-nunito text-[#101720]",
        props.className,
      )}
      allowFontScaling={false}
    ></ReactNativeText>
  );
}
