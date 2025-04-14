import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  Dimensions, 
  Modal 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { router } from 'expo-router';
import { useAppContext } from '@/hooks/useAppContext';
import Theme from '@/constants/Theme';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.8;
interface MenuItemProps {
  icon: ComponentProps<typeof FontAwesome>['name'];
  label: string;
  route: string;
  onPress: () => void;
}

const MenuItem = ({ icon, label, route, onPress }: MenuItemProps) => (
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => {
      onPress();
      router.push(route as any);
    }}
  >
    <FontAwesome name={icon} size={22} color={Theme.colors.primary} style={styles.menuIcon} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function MenuOverlay() {
  const { isMenuOpen, toggleMenu } = useAppContext();
  const slideAnim = React.useRef(new Animated.Value(-MENU_WIDTH)).current;

  // Animate the menu in and out
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? 0 : -MENU_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, slideAnim]);

  const closeMenu = () => {
    toggleMenu();
  };

  if (!isMenuOpen) return null;

  return (
    <Modal
      transparent
      visible={isMenuOpen}
      animationType="none"
      onRequestClose={closeMenu}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={closeMenu}
        />
        
        <Animated.View 
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Eruvify</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <FontAwesome name="times" size={22} color={Theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.menuScroll}>
            <MenuItem 
              icon="home" 
              label="Home" 
              route="/(tabs)/" 
              onPress={closeMenu} 
            />
            <MenuItem 
              icon="map" 
              label="Map" 
              route="/(tabs)/map" 
              onPress={closeMenu} 
            />
            <MenuItem 
              icon="check-circle" 
              label="Check" 
              route="/(tabs)/check" 
              onPress={closeMenu} 
            />
            <MenuItem 
              icon="envelope" 
              label="Messages" 
              route="/(tabs)/messages" 
              onPress={closeMenu} 
            />
            <MenuItem 
              icon="user" 
              label="Profile" 
              route="/(tabs)/profile" 
              onPress={closeMenu} 
            />
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                // Open guide popup
              }}
            >
              <FontAwesome name="question-circle" size={22} color={Theme.colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Guide</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                // Open settings
              }}
            >
              <FontAwesome name="cog" size={22} color={Theme.colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                // Open help
              }}
            >
              <FontAwesome name="info-circle" size={22} color={Theme.colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Help</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <View style={styles.menuFooter}>
            <Text style={styles.footerText}>Eruvify v1.0.0</Text>
            <TouchableOpacity>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: MENU_WIDTH,
    backgroundColor: Theme.colors.white,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  menuTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  closeButton: {
    padding: Theme.spacing.xs,
  },
  menuScroll: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[200],
  },
  menuIcon: {
    width: 30,
  },
  menuLabel: {
    fontSize: Theme.typography.fontSize.md,
    marginLeft: Theme.spacing.md,
  },
  divider: {
    height: 20,
    backgroundColor: Theme.colors.gray[100],
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[200],
  },
  menuFooter: {
    padding: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  footerText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[500],
    marginBottom: Theme.spacing.md,
  },
  signOutText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.danger,
    fontWeight: '500',
  },
});