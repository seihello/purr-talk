import React from "react";
import { Dimensions, Image, View } from "react-native";
import TemplateView from "../components/template-view";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import { MIN_RECORDING_SECONDS } from "../constants";
import ErrorCode from "../enum/error-code.enum";
import RecordStatus from "../enum/record-status.enum";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
  errorCode: ErrorCode;
};
export default function ErrorView({ setStatus, errorCode }: Props) {
  const { width } = Dimensions.get("window");

  return (
    <TemplateView
      background="light"
      className="flex flex-col items-center justify-between px-4 pb-8 pt-12"
    >
      <View className="mb-8 flex max-h-96 grow flex-col justify-end">
        <Image
          source={require(`../../assets/img/tangled_cat.png`)}
          style={{
            width: width,
            height: (width * 860) / 1441,
          }}
        />
      </View>
      <View className="flex grow flex-col items-center">
        <Text className="font-nunito-bold text-lg">
          Oops! Something went wrong.
        </Text>
        <Text>
          {errorCode === ErrorCode.Network
            ? "Please check your internet connection or try again later."
            : errorCode === ErrorCode.ShortRecording
              ? `Your cat has more to say! Please record at least ${MIN_RECORDING_SECONDS} seconds for our translator to work its magic!`
              : "We couldn’t translate that meow. Don’t worry, your cat’s secrets are safe with us!"}
        </Text>
      </View>
      <Button
        title="Try again"
        onPress={() => {
          setStatus(RecordStatus.Recording);
        }}
      />
    </TemplateView>
  );
}
