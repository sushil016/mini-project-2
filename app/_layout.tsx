import { Stack } from "expo-router";
import { ThemeProvider } from "../context/theme-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/context/theme-context";
import { View } from "react-native";

function RootLayoutNav() {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
