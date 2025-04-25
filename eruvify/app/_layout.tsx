import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppProvider } from '@/context/AppContext';
import MenuOverlay from '@/components/MenuOverlay';
import MenuButton from '@/components/MenuButton';
import GuidePopup from '@/components/GuidePopup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="contact" options={{ headerShown: false }} />
              <Stack.Screen name="guide" options={{ headerShown: false }} />
              <Stack.Screen name="report-issue" options={{ presentation: 'modal' }} />
              <Stack.Screen name="trip-end" options={{ presentation: 'modal' }} />
              <Stack.Screen name="route-change" options={{ presentation: 'modal' }} />
            </Stack>
            
            {/* Menu button that appears on all screens */}
            <MenuButton />
            
            {/* Menu overlay that slides in from the left */}
            <MenuOverlay />
            
            {/* Guide popup */}
            <GuidePopup 
              isOpen={isGuideOpen}
              onClose={() => setIsGuideOpen(false)}
            />
          </GestureHandlerRootView>
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
