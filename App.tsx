import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/home";
import InitPage from "./src/init";
import WordPage from "./src/word";

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
            // title: "",
            // headerStyle: {
            //   backgroundColor: "#239CAC",
            // },
            // headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
            // title: "",
            // headerStyle: {
            //   backgroundColor: "#239CAC",
            // },
            // headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Word"
          component={WordPage}
          options={{
            headerShadowVisible: false,
            headerTintColor: "#239CAC",
            headerTitleStyle: {
              color: "#000000",
              fontFamily: "DMSansBold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
