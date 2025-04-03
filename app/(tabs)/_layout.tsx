import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Simple inline implementation of haptic tab to avoid import issues
function HapticTabSimple(props: any) {
  return (
    <TouchableOpacity 
      {...props} 
      activeOpacity={0.7}
    />
  );
}

// Simple inline implementation of tab bar background to avoid import issues
function TabBarBackgroundSimple() {
  const colorScheme = useColorScheme();
  return (
    <View 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: colorScheme === 'dark' ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme || 'light'].tint,
        headerShown: false,
        tabBarButton: (props) => <HapticTabSimple {...props} />,
        tabBarBackground: () => <TabBarBackgroundSimple />,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todo List',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist.checked" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}