import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import WelcomeScreen from "./screens/WelcomeScreen";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { Provider } from "react-redux";
import myStore from "@/context/store";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import NameScreen from "./screens/NameScreen";
import PackListScreen from "./screens/PackListScreen";
import FlashcardScreen from "./screens/FlashcardScreen"
import AddPackScreen from "./screens/AddPackScreen"
import AddItemScreen from "./screens/AddItemScreen"
import AccountScreen from "./screens/AccountScreen"
import CustomCollection from "./screens/CustomCollection"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={myStore}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailPackage" component={DetailScreen} />
          <Stack.Screen name="FlashCard" component={FlashcardScreen} />
          <Stack.Screen name="AddPackage" component={AddPackScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen name="SetAccountAvatar" component={AccountScreen} />
          <Stack.Screen name="SetName" component={NameScreen} />
          <Stack.Screen name="PackageList" component={PackListScreen} />
          <Stack.Screen name="NewCollection" component={CustomCollection} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
