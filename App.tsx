import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useProfile from "./src/hooks/use-profile";
import HomePage from "./src/pages/home";
import InitPage from "./src/pages/init";
import IntroductionPage from "./src/pages/introduction";
import ProfileInputPage from "./src/pages/profile-input";
import ProfileReadyPage from "./src/pages/profile-ready";
import ProfileSettingPage from "./src/pages/profile-setting";
import RecordPage from "./src/pages/record";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
  });

  const { profile, isLoading } = useProfile();

  // const [headerTitle, setHeaderTitle] = useState("");

  if (!fontsLoaded || isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={profile ? "Home" : "Init"}>
        {/* <Stack.Navigator initialRouteName={"Init"}> */}
        <Stack.Screen
          name="Init"
          component={InitPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileInput"
          component={ProfileInputPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileReady"
          component={ProfileReadyPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Introduction"
          component={IntroductionPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Record"
          component={RecordPage}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#4651D1",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              color: "white",
              fontFamily: "NunitoSemiBold",
            },
          }}
        />
        <Stack.Screen
          name="Your Profile"
          component={ProfileSettingPage}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E8E7F7",
            },
            headerTintColor: "#4651D1",
            headerTitleStyle: {
              color: "black",
              fontFamily: "NunitoSemiBold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
