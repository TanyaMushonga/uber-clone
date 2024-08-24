import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
