import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Theme = {
  // Colors
  colors: {
    primary: '#007bff',
    primaryDark: '#0069d9',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    gray: {
      100: '#f8f9fa',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },
    background: '#ffffff',
    card: '#f8f8f8',
    text: '#333333',
    placeholder: '#aaaaaa',
    border: '#dddddd',
    alert: '#ff4d4d',
    alertBackground: '#fff0f0',
  },
  
  // Typography
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
      xxxl: 42,
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Sizes
  sizes: {
    screenWidth: width,
    screenHeight: height,
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      pill: 50,
      circle: 9999,
    },
    icon: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
    },
    button: {
      height: 48,
      borderRadius: 8,
    },
    input: {
      height: 48,
      borderRadius: 8,
    },
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  
  // Z-index
  zIndex: {
    base: 1,
    overlay: 10,
    modal: 100,
    toast: 1000,
  },
  
  // Layout
  layout: {
    screenPadding: 16,
    tabBarHeight: 60,
    headerHeight: 60,
  },
};

export default Theme;