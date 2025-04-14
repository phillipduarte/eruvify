import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Theme from '@/constants/Theme';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  rounded?: boolean;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  rounded = false,
}: BadgeProps) {
  // Get color based on variant
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: Theme.colors.secondary };
      case 'success':
        return { backgroundColor: Theme.colors.success };
      case 'danger':
        return { backgroundColor: Theme.colors.danger };
      case 'warning':
        return { backgroundColor: Theme.colors.warning };
      case 'info':
        return { backgroundColor: Theme.colors.info };
      case 'primary':
      default:
        return { backgroundColor: Theme.colors.primary };
    }
  };

  // Get size styles
  const getSizeStyle = (): { badgeStyle: ViewStyle; textStyle: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          badgeStyle: {
            paddingVertical: 2,
            paddingHorizontal: 6,
          },
          textStyle: {
            fontSize: Theme.typography.fontSize.xs,
          },
        };
      case 'large':
        return {
          badgeStyle: {
            paddingVertical: 8,
            paddingHorizontal: 12,
          },
          textStyle: {
            fontSize: Theme.typography.fontSize.md,
          },
        };
      case 'medium':
      default:
        return {
          badgeStyle: {
            paddingVertical: 4,
            paddingHorizontal: 8,
          },
          textStyle: {
            fontSize: Theme.typography.fontSize.sm,
          },
        };
    }
  };

  const { badgeStyle, textStyle: sizeTextStyle } = getSizeStyle();

  return (
    <View
      style={[
        styles.badge,
        getVariantStyle(),
        badgeStyle,
        rounded && styles.rounded,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, sizeTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Theme.sizes.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    borderRadius: Theme.sizes.borderRadius.pill,
  },
  text: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});