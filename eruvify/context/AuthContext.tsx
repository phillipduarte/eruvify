import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { auth, db } from '@/lib/supabase';
import { Session, User, AuthError } from '@supabase/gotrue-js';

// Define the shape of a user profile
interface UserProfile {
  id: string;
  username: string;
  full_name: string | null;
  profile_picture: string | null;
  community_id: string | null;
}

// Define the auth context state and methods
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available to any child component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from Supabase
  const fetchProfile = async (userId: string) => {
    const { data, error } = await db
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data as UserProfile;
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await auth.signInWithPassword({ email, password });
    
    if (data?.user) {
      setUser(data.user);
      setSession(data.session);
      
      // Fetch user profile
      const userProfile = await fetchProfile(data.user.id);
      setProfile(userProfile);
    }
    
    setIsLoading(false);
    return { error };
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    
    // Create the user in Supabase Auth
    const { data, error } = await auth.signUp({ email, password });
    
    if (data?.user && !error) {
      // Create a profile for the user
      const { error: profileError } = await db
        .from('user_profiles')
        .insert({
          id: data.user.id,
          username,
          full_name: '',
          profile_picture: null,
          community_id: null
        });
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Handle the error (you might want to delete the created auth user)
      } else {
        // Set the user and fetch the profile
        setUser(data.user);
        setSession(data.session);
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
      }
    }
    
    setIsLoading(false);
    return { error };
  };

  // Sign out
  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.id) return;

    setIsLoading(true);
    
    const { error } = await db
      .from('user_profiles')
      .update(data)
      .eq('id', user.id);
    
    if (!error && profile) {
      setProfile({ ...profile, ...data });
    }
    
    setIsLoading(false);
  };

  // Listen for auth state changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await auth.getSession();
      console.log("Session check result:", data?.session ? "User found" : "No user", error || "");

      
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        
        // Fetch user profile
        const userProfile = await fetchProfile(data.session.user.id);
        setProfile(userProfile);
      }
      
      setIsLoading(false);
    };
    
    getSession();

    const { data } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        setSession(session);
        fetchProfile(session.user.id).then(profile => setProfile(profile));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setProfile(null);
      }
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};