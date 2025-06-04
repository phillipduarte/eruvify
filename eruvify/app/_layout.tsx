import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments, SplashScreen, Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import MenuOverlay from '@/components/MenuOverlay';
import MenuButton from '@/components/MenuButton';
import GuidePopup from '@/components/GuidePopup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Authentication check function
function InitialLayout() {
  const { isLoading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoading) return;
    
    console.log("Auth state:", user ? "Logged in" : "Not logged in");
    
    const inAuthGroup = segments[0] === '(auth)';
    
    // If not logged in and not on auth screens, redirect to login
    if (!user && !inAuthGroup) {
      console.log("Redirecting to login");
      router.replace('/login');
    } 
    // If logged in and on auth screen, redirect to home
    else if (user && inAuthGroup) {
      console.log("Redirecting to home");
      router.replace('/(tabs)');
    }
    
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [user, isLoading]);
  
  if (isLoading) return null;
  
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
        <Stack.Screen name="report-issue" options={{ presentation: 'modal' }} />
        <Stack.Screen name="trip-end" options={{ headerShown: false }} />
        <Stack.Screen name="route-change" options={{ presentation: 'modal' }} />
      </Stack>
      
      {user && <MenuButton />}
      {user && <MenuOverlay />}
    </>
  );
}

// Root layout with providers
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
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
    <AuthProvider>
      <AppProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <InitialLayout />
            {isGuideOpen && (
              <GuidePopup 
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
              />
            )}
          </GestureHandlerRootView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}
