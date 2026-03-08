import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { initDB } from "../database/db";
import "../global.css";
import { AuthService } from "../services/auth.service";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      initDB();

      const user = await AuthService.getCurrentUser();
      const inAuthGroup = segments[0] === "(root)";

      if (!user && inAuthGroup) {
        router.replace("/login");
      }

      if (user && !inAuthGroup) {
        router.replace("/(root)/(tabs)/home");
      }

      setIsReady(true);
    };

    prepare();
  }, [segments]);

  if (!isReady) return null;

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(root)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
