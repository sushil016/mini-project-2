import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/theme-context";
import { View, Text, Pressable, StyleSheet } from "react-native";

function CustomHeader() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <Pressable style={styles.iconButton}>
        <Ionicons name="person-circle-outline" size={24} color={theme.text} />
      </Pressable>
      
      <Text style={[styles.title, { color: theme.text }]}>Route Tracker</Text>
      
      <Pressable style={styles.iconButton} onPress={toggleTheme}>
        <Ionicons 
          name={isDarkMode ? "sunny" : "moon"} 
          size={24} 
          color={theme.text}
        />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Tabs screenOptions={{
        header: () => <CustomHeader />,
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.cardBackground,
        },
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Track",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistant"
          options={{
            title: "AI Assistant",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-ellipses" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40, // for status bar
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
}); 