import { Text as ReactNativeText } from "react-native";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Text({ children, className = "", ...rest }: Props) {
  return (
    <ReactNativeText className={"font-nunito".concat(className)} {...rest}>
      {children}
    </ReactNativeText>
  );
}
