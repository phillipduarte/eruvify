import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Theme from '@/constants/Theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'outline' | 'elevated';
  padding?: boolean;
}

export default function Card({
  children,
  style,
  variant = 'default',
  padding = true,
}: CardProps) {
  // Get variant-specific styles
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: Theme.colors.white,
          borderWidth: 1,
          borderColor: Theme.colors.border,
        };
      case 'elevated':
        return {
          backgroundColor: Theme.colors.white,
          ...Theme.shadows.md,
        };
      case 'default':
      default:
        return {
          backgroundColor: Theme.colors.card,
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyle(),
        padding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.sizes.borderRadius.md,
    overflow: 'hidden',
  },
  padding: {
    padding: Theme.spacing.md,
  },
});