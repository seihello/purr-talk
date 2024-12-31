import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/home";
import InitPage from "./src/init";
import IntroductionPage from "./src/introduction";
import ProfileInputPage from "./src/profile-input";
import ProfileReadyPage from "./src/profile-ready";
import TranslatePage from "./src/translate";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
  });

  // const [headerTitle, setHeaderTitle] = useState("");

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Init">
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
          name="Translate"
          component={TranslatePage}
          options={{
            headerShown: false,
            // title: "",
            // headerStyle: {
            //   backgroundColor: "#239CAC",
            // },
            // headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
