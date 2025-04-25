import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  Dimensions, 
  Modal,
  Image 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppContext } from '@/hooks/useAppContext';
import Theme from '@/constants/Theme';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name'];

interface MenuItemProps {
  icon: FontAwesomeIconName;
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
  // Changed to start offscreen from the left side
  const slideAnim = React.useRef(new Animated.Value(-MENU_WIDTH)).current;

  // Animate the menu in and out
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      // When open, position at 0 (left side of screen)
      // When closed, move offscreen to the left (-MENU_WIDTH)
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
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/icon.png')} 
                style={styles.logo} 
              />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <FontAwesome name="times" size={22} color={Theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.menuScroll}>
            {/* Removed redundant navigation items */}
            
            {/* Support & Info Section */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                router.push('/contact' as any);
              }}
            >
              <FontAwesome name="address-book" size={22} color={Theme.colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Contact</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                router.push('/guide' as any);
              }}
            >
              <FontAwesome name="question-circle" size={22} color={Theme.colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Guide</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
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
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    left: 0, // Changed from right: 0 to left: 0
    width: MENU_WIDTH,
    backgroundColor: Theme.colors.white,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 }, // Changed from -2 to 2 (shadow on right)
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xl, // Increased vertical padding to accommodate larger logo
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center', // Center the logo horizontally
    marginRight: 30, // Offset the close button width to center properly
    padding: 0,
    margin: 0,
  },
  logo: {
    width: 120, // Increased from 70 to 120
    height: 100, // Increased from 70 to 120
    resizeMode: 'contain',
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