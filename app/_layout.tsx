import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { createNavigationTheme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/lib/sevices/auth/auth-context";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <AuthProvider>
      <ThemeProvider
        value={createNavigationTheme(
          colorScheme,
          colorScheme === "dark" ? DarkTheme : DefaultTheme,
        )}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
