import { View, Text, Switch, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";

export default function TrackScreen() {
  const [isHardwareMode, setIsHardwareMode] = useState(false);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* <View style={styles.headerContent}>
            <Text style={[styles.title, { color: 'white' }]}>Location Tracker</Text>
            <Pressable onPress={toggleTheme} style={styles.themeToggle}>
              <Ionicons 
                name={isDarkMode ? "sunny" : "moon"} 
                size={24} 
                color="white" 
              />
            </Pressable>
          </View> */}
          <View style={styles.modeToggle}>
            <Text style={[styles.modeText, { color: 'white' }]}>
              {isHardwareMode ? "Hardware Mode" : "Phone GPS Mode"}
            </Text>
            <Switch
              value={isHardwareMode}
              onValueChange={setIsHardwareMode}
              trackColor={{ false: theme.cardBackground, true: theme.secondary }}
              thumbColor={isHardwareMode ? theme.primary : '#f4f3f4'}
            />
          </View>
        </LinearGradient>

        <View style={[styles.mapPlaceholder, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.placeholderText, { color: theme.text }]}>
            Map will be integrated here
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable 
            style={[styles.actionButton, { backgroundColor: theme.primary }]}
            onPress={() => {}}
          >
            <Ionicons name="location" size={24} color="white" />
            <Text style={styles.actionText}>Add Pin</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.actionButton, { backgroundColor: theme.secondary }]}
            onPress={() => {}}
          >
            <Ionicons name="navigate" size={24} color="white" />
            <Text style={styles.actionText}>Start Track</Text>
          </Pressable>
        </View>

        {/* Recent Pins Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Pins</Text>
          {[1, 2, 3].map((item) => (
            <View 
              key={item} 
              style={[styles.pinItem, { borderBottomColor: theme.background }]}
            >
              <Ionicons name="location" size={24} color={theme.primary} />
              <View style={styles.pinInfo}>
                <Text style={[styles.pinTitle, { color: theme.text }]}>
                  Pin Location {item}
                </Text>
                <Text style={[styles.pinSubtitle, { color: theme.tabIconDefault }]}>
                  Added 2 hours ago
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.tabIconDefault} />
            </View>
          ))}
        </View>

        {/* Active Tracking Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Current Track</Text>
          <View style={styles.trackingInfo}>
            <View style={styles.trackingStats}>
              <Text style={[styles.statsLabel, { color: theme.tabIconDefault }]}>
                Distance
              </Text>
              <Text style={[styles.statsValue, { color: theme.text }]}>0.0 km</Text>
            </View>
            <View style={styles.trackingStats}>
              <Text style={[styles.statsLabel, { color: theme.tabIconDefault }]}>
                Duration
              </Text>
              <Text style={[styles.statsValue, { color: theme.text }]}>00:00:00</Text>
            </View>
            <View style={styles.trackingStats}>
              <Text style={[styles.statsLabel, { color: theme.tabIconDefault }]}>
                Pins
              </Text>
              <Text style={[styles.statsValue, { color: theme.text }]}>0</Text>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={theme.gradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.controls}
        >
          <Text style={[styles.statusText, { color: 'white' }]}>
            Status: {isHardwareMode ? "Waiting for hardware data..." : "Ready to track"}
          </Text>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeText: {
    fontSize: 16,
  },
  mapPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 20,
  },
  placeholderText: {
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: '45%',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  pinInfo: {
    flex: 1,
    marginLeft: 12,
  },
  pinTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  pinSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  trackingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  trackingStats: {
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    padding: 16,
    margin: 16,
    borderRadius: 20,
    marginBottom: 32,
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 