import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';

// Define the shape of a post
export interface Post {
  id: string | number;
  username: string;
  comment: string;
  time: string;
  image?: string;
  isAlert?: boolean;
}

// Define the type for our context
interface AppContextType {
  // Navigation state
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  
  // Trip state
  isStarted: boolean;
  setIsStarted: (started: boolean) => void;
  isFinished: boolean;
  setIsFinished: (finished: boolean) => void;
  distanceWalked: number;
  setDistanceWalked: (distance: number) => void;
  totalDistance: number;
  progressPercent: number;
  setProgressPercent: (percent: number) => void; // Add setter type
  
  // Report issue state
  isReporting: boolean;
  setIsReporting: (reporting: boolean) => void;
  reportText: string;
  setReportText: (text: string) => void;
  
  // Posts state
  posts: Post[];
  addPost: (post: Post) => void;
  
  // UI state
  isMenuOpen: boolean;
  toggleMenu: () => void;
  hasStartedBefore: boolean;
  setHasStartedBefore: (started: boolean) => void;
  
  // Image state
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  
  // Post comment state
  comment: string;
  setComment: (comment: string) => void;
  
  // Route change state
  isRouteChangeOpen: boolean;
  setIsRouteChangeOpen: (open: boolean) => void;
  
  // Helper functions
  handleRestart: () => void;
  handleRouteChangeConfirm: () => void;
  handlePostSubmit: () => void;
  getMapPlaceholder: () => string;
}

// Create the context with a default undefined value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  // Total distance for the demo (in miles)
  const totalDistance = 0.7;

  // Track if the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Whether the user has started the route
  const [isStarted, setIsStarted] = useState(false);

  // Whether the route is finished
  const [isFinished, setIsFinished] = useState(false);

  // Whether the report issue screen is active
  const [isReporting, setIsReporting] = useState(false);

  // How far the user has walked
  const [distanceWalked, setDistanceWalked] = useState(0);
  
  // Add state for progress percentage
  const [progressPercent, setProgressPercent] = useState(0);

  // Active screen state
  const [activeScreen, setActiveScreen] = useState('check');

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);

  // Comment and image for post creation
  const [comment, setComment] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Report text for issue reporting
  const [reportText, setReportText] = useState('');

  // Whether user has started before (for Start/Restart button)
  const [hasStartedBefore, setHasStartedBefore] = useState(false);

  // Route change popup state
  const [isRouteChangeOpen, setIsRouteChangeOpen] = useState(false);

  // Toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add a new post
  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  // Restart everything
  const handleRestart = () => {
    setIsStarted(false);
    setDistanceWalked(0);
    setProgressPercent(0); // Reset progress percent
    setIsFinished(false);
    setIsReporting(false);
  };

  // Handle route change confirmation
  const handleRouteChangeConfirm = () => {
    // Display an alert and close the popup
    alert("Your route change request has been submitted!");
    setIsRouteChangeOpen(false);
  };

  // Handle post submission
  const handlePostSubmit = () => {
    // Create a new post object
    const newPost: Post = {
      id: Date.now(),
      username: 'Current User',
      time: new Date().toLocaleTimeString(),
      comment: comment,
      image: uploadedImage || undefined
    };

    // Add the post
    addPost(newPost);

    // Clear the input states
    setComment('');
    setUploadedImage(null);

    // Reset the trip state
    handleRestart();

    // Switch to the Home screen
    setActiveScreen('home');
    router.replace('/(tabs)');
  };

  // Determine the map placeholder based on progress
  const getMapPlaceholder = () => {
    if (distanceWalked >= totalDistance / 2 && distanceWalked < totalDistance * 0.9) {
      return 'mid'; // Will be used to pick the right image
    } else if (distanceWalked >= totalDistance) {
      return 'end';
    }
    return 'start';
  };

  // Combine all our state and functions into the context value
  const contextValue: AppContextType = {
    activeScreen,
    setActiveScreen,
    isStarted,
    setIsStarted,
    isFinished,
    setIsFinished,
    distanceWalked,
    setDistanceWalked,
    totalDistance,
    progressPercent,
    setProgressPercent, // Provide the setter function
    isReporting,
    setIsReporting,
    reportText,
    setReportText,
    posts,
    addPost,
    isMenuOpen,
    toggleMenu,
    hasStartedBefore,
    setHasStartedBefore,
    uploadedImage,
    setUploadedImage,
    comment,
    setComment,
    isRouteChangeOpen,
    setIsRouteChangeOpen,
    handleRestart,
    handleRouteChangeConfirm,
    handlePostSubmit,
    getMapPlaceholder
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}