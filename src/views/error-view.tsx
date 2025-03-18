import React from "react";
import { Dimensions, Image, View } from "react-native";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import RecordStatus from "../enum/record-status.enum";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<RecordStatus>>;
};
export default function ErrorView({ setStatus }: Props) {
  const { width } = Dimensions.get("window");

  return (
    <View className="flex h-full w-full flex-col items-center justify-between bg-primary-300 px-4 pb-8">
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
          We couldn’t translate that meow. Don’t worry, your cat’s secrets are
          safe with us!
        </Text>
      </View>
      <Button
        title="Try again"
        onPress={() => {
          setStatus(RecordStatus.Recording);
        }}
      />
    </View>
  );
}
