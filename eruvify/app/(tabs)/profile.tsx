import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Theme from '@/constants/Theme';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  // Get auth context
  const { profile, signOut } = useAuth();
  
  // Sample data for badges
  const badges = [
    { id: 1, name: 'First Check', icon: 'check-circle' },
    { id: 2, name: '5 Checks', icon: 'star' },
    { id: 3, name: 'Issue Reporter', icon: 'exclamation-circle' },
    { id: 4, name: 'Regular Checker', icon: 'calendar-check-o' },
    { id: 5, name: 'Community Helper', icon: 'users' },
    { id: 6, name: 'Eruv Expert', icon: 'graduation-cap' },
    { id: 7, name: 'Map Explorer', icon: 'map-o' },
    { id: 8, name: 'Perfect Attendance', icon: 'trophy' },
    { id: 9, name: 'Problem Solver', icon: 'lightbulb-o' },
  ];
  
  // Sample stats data
  const stats = {
    totalChecks: 27,
    totalDistance: 18.4,
    issuesReported: 3,
    consecutiveWeeks: 8
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        <Card style={styles.profileCard} variant="elevated">
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarImage}>
                <FontAwesome name="user" size={60} color={Theme.colors.gray[400]} />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <FontAwesome name="camera" size={16} color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileDetails}>
                <Text style={styles.userName}>{profile?.full_name || profile?.username || "Current User"}</Text>
                <Text style={styles.userInfo}>@{profile?.username || "username"}</Text>
              <Text style={styles.userInfo}>Member since January 2023</Text>
              <Text style={styles.userInfo}>Philadelphia, PA</Text>
            </View>
          </View>
          
          <Button 
            title="Edit Profile" 
            variant="outline" 
            onPress={() => console.log('Edit profile')} 
            style={styles.editButton}
          />
        </Card>
        
        <Card style={styles.badgesCard} variant="elevated">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <Badge variant="primary" size="small" rounded>
              <Text style={styles.badgeCount}>{badges.length}</Text>
            </Badge>
          </View>
          
          <View style={styles.badgesGrid}>
            {badges.map(badge => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={styles.badgeIcon}>
                  <FontAwesome name={badge.icon} size={24} color={Theme.colors.primary} />
                </View>
                <Text style={styles.badgeName} numberOfLines={1}>
                  {badge.name}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        
        <Card style={styles.statsCard} variant="elevated">
          <Text style={styles.sectionTitle}>Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalChecks}</Text>
              <Text style={styles.statLabel}>Total Checks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalDistance}mi</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.issuesReported}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.consecutiveWeeks}</Text>
              <Text style={styles.statLabel}>Weeks</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.activityCard} variant="elevated">
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityList}>
            {[1, 2, 3].map(i => (
              <View key={i} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <FontAwesome 
                    name={i === 1 ? 'check-circle' : i === 2 ? 'map-marker' : 'exclamation-circle'} 
                    size={20} 
                    color={i === 3 ? Theme.colors.danger : Theme.colors.primary} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    {i === 1 
                      ? 'Completed eruv check on West Route' 
                      : i === 2 
                        ? 'Added a new route to favorites'
                        : 'Reported an issue on South Route'}
                  </Text>
                  <Text style={styles.activityTime}>
                    {i === 1 ? '2 days ago' : i === 2 ? '1 week ago' : '2 weeks ago'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
        
        <View style={styles.settingsSection}>
          <Button
            title="Account Settings"
            variant="secondary"
            onPress={() => console.log('Account settings')}
            style={styles.settingsButton}
          />
          <Button
            title="Privacy Settings"
            variant="secondary"
            onPress={() => console.log('Privacy settings')}
            style={styles.settingsButton}
          />
          <Button
            title="Sign Out"
            variant="outline"
            onPress={() => signOut()}
            style={styles.settingsButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.lg,
  },
  header: {
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.colors.text,
  },
  profileCard: {
    marginBottom: Theme.spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Theme.spacing.lg,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginBottom: 2,
  },
  editButton: {
    alignSelf: 'center',
  },
  badgesCard: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  badgeCount: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Theme.colors.gray[300],
  },
  badgeName: {
    fontSize: Theme.typography.fontSize.xs,
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: Theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.sm,
  },
  statItem: {
    width: '48%',
    backgroundColor: Theme.colors.gray[100],
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginTop: 4,
  },
  activityCard: {
    marginBottom: Theme.spacing.lg,
  },
  activityList: {
    marginTop: Theme.spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray[200],
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: Theme.typography.fontSize.sm,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.gray[500],
  },
  settingsSection: {
    marginBottom: Theme.spacing.xl,
  },
  settingsButton: {
    marginBottom: Theme.spacing.sm,
  },
});