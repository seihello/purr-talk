import React, { useEffect, useRef, useState } from "react";
import ErrorCode from "../enum/error-code.enum";
import RecordStatus from "../enum/record-status.enum";
import useProfile from "../hooks/use-profile";
import ErrorView from "../views/error-view";
import RecordingView from "../views/recording-view";
import TranslatedView from "../views/translated-view";
import TranslatingView from "../views/translating-view";

export default function RecordPage({ navigation }: any) {
  const { profile } = useProfile();
  const [status, setStatus] = useState(RecordStatus.Recording);
  const [errorCode, setErrorCode] = useState(ErrorCode.Other);
  const voiceUrl = useRef<string>("");
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    if (
      status === RecordStatus.Recording ||
      status === RecordStatus.Translating
    ) {
      navigation.setOptions({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#4651D1",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          color: "white",
          fontFamily: "NunitoSemiBold",
        },
      });
    } else if (
      status === RecordStatus.Translated ||
      status === RecordStatus.Error
    ) {
      navigation.setOptions({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#E8E7F7",
        },
        headerTintColor: "#4651D1",
        headerTitleStyle: {
          color: "black",
          fontFamily: "NunitoSemiBold",
        },
      });
    }
  }, [status]);

  if (!profile) return;

  switch (status) {
    case RecordStatus.Recording:
      return (
        <RecordingView
          setStatus={setStatus}
          setErrorCode={setErrorCode}
          setTranslation={setTranslation}
          voiceUrl={voiceUrl}
        />
      );

    case RecordStatus.Translating:
      return (
        <TranslatingView
          setStatus={setStatus}
          setErrorCode={setErrorCode}
          translation={translation}
          setTranslation={setTranslation}
          voiceUrl={voiceUrl}
        />
      );

    case RecordStatus.Translated:
      return (
        <TranslatedView
          profile={profile}
          setStatus={setStatus}
          translation={translation}
          voiceUrl={voiceUrl}
        />
      );

    case RecordStatus.Error:
      return <ErrorView setStatus={setStatus} errorCode={errorCode} />;
  }
}
