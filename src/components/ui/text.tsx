import { Text as ReactNativeText } from "react-native";

export default function Text(props: any) {
  const { ...rest } = props;

  return (
    <ReactNativeText
      className={"text-center font-nunito text-[#101720]"}
      allowFontScaling={false}
      {...rest}
    ></ReactNativeText>
  );
}
