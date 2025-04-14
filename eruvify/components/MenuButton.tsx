import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/useAppContext';
import Theme from '@/constants/Theme';

export default function MenuButton() {
  const { toggleMenu } = useAppContext();

  return (
    <TouchableOpacity 
      style={styles.menuButton} 
      onPress={toggleMenu}
      activeOpacity={0.7}
    >
      <FontAwesome name="bars" size={22} color={Theme.colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: Theme.colors.white,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 100,
  },
});