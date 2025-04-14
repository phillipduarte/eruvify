import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator 
} from 'react-native';
import Theme from '@/constants/Theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false, 
  loading = false,
  style,
  textStyle
}: ButtonProps) {
  // Determine button and text styles based on variant
  const getButtonStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? Theme.colors.gray[400] : Theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? Theme.colors.gray[300] : Theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Theme.colors.gray[400] : Theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: disabled ? Theme.colors.gray[400] : Theme.colors.danger,
        };
      case 'success':
        return {
          backgroundColor: disabled ? Theme.colors.gray[400] : Theme.colors.success,
        };
      default:
        return {};
    }
  };

  const getTextStyles = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return {
          color: disabled ? Theme.colors.gray[500] : Theme.colors.primary,
        };
      case 'primary':
      case 'secondary':
      case 'danger':
      case 'success':
        return {
          color: Theme.colors.white,
        };
      default:
        return {};
    }
  };

  // Determine size styles
  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
        };
    }
  };

  // Get text size based on button size
  const getTextSizeStyles = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: Theme.typography.fontSize.sm,
        };
      case 'large':
        return {
          fontSize: Theme.typography.fontSize.lg,
        };
      case 'medium':
      default:
        return {
          fontSize: Theme.typography.fontSize.md,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        getSizeStyles(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Theme.colors.primary : Theme.colors.white} 
          size="small" 
        />
      ) : (
        <Text 
          style={[
            styles.text, 
            getTextStyles(),
            getTextSizeStyles(),
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.sizes.button.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});