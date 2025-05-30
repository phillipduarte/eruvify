import 'react-native-url-polyfill/auto';  // Ensures URL polyfill for fetch
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoTrueClient } from '@supabase/gotrue-js';  // Auth client
import { PostgrestClient } from '@supabase/postgrest-js';  // DB client
import Constants from 'expo-constants';

// Replace with your Supabase URL and anon key
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

// Auth client setup
export const auth = new GoTrueClient({
  url: `${supabaseUrl}/auth/v1`,  // Auth endpoint
  autoRefreshToken: true,
  persistSession: true,
  storageKey: 'supabase.auth.token',
  storage: AsyncStorage,
  headers: {  // Add this headers section!
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  },
  fetch,  // Use native fetch API for networking
});

// DB client setup (for querying data)
export const db = new PostgrestClient(`${supabaseUrl}/rest/v1`, {
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
  fetch,  // Use native fetch API
});