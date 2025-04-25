import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/hooks/useAppContext';
import PostCard from '@/components/PostCard';
import Theme from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { posts } = useAppContext();
  const [activeTab, setActiveTab] = useState(0); // 0 = Alerts, 1 = All Posts
  const [alertFilter, setAlertFilter] = useState('all');
  
  // Dummy posts data as fallback
  const dummyPosts = [
    {
      id: 'dummy-2',
      username: "Rabbi_David",
      fullName: "Rabbi David Cohen",
      profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
      comment: "Important community announcement: The eruv near Cedar Park has been repaired. Thanks to our volunteers!",
      time: "20 minutes ago",
      isAlert: true,
      alertType: 'repair',
      likes: 12,
      comments: [
        {
          id: 'c1',
          username: 'Sarah_M',
          fullName: 'Sarah Mendelsohn',
          profilePicture: "https://randomuser.me/api/portraits/women/33.jpg",
          text: 'Thank you for the quick repair!',
          timestamp: '10 minutes ago'
        }
      ]
    },
    {
      id: 'dummy-1',
      username: "Sarah_J",
      fullName: "Sarah Jacobson",
      profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
      comment: "Just checked my eruv using the app - all clear for this Shabbat!",
      time: "1 hour ago",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2576&auto=format&fit=crop",
      likes: 8,
      comments: []
    },
    {
      id: 'alert-6',
      username: "Eruv_Committee",
      fullName: "Eruv Committee",
      profilePicture: "https://randomuser.me/api/portraits/men/42.jpg",
      comment: "⚠️ URGENT ALERT: Due to fallen trees from last night's storm, sections of the eruv along Chestnut Street are down. Status: NOT KOSHER for this Shabbat in affected areas.",
      time: "2 hours ago",
      isAlert: true,
      alertType: 'weather',
    },
    {
      id: 'dummy-4',
      username: "Rebecca_L",
      fullName: "Rebecca Levi",
      profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
      comment: "Question: Is anyone else having trouble viewing the map in the northwest section?",
      time: "3 hours ago"
    },
    {
      id: 'alert-1',
      username: "Eruv Committee",
      fullName: "Eruv Committee",
      profilePicture: "https://randomuser.me/api/portraits/men/43.jpg",
      comment: "⚠️ ALERT: The eruv on Spruce Street is down due to construction. Please check status before Shabbat.",
      time: "3 hours ago",
      isAlert: true,
      alertType: 'breakage',
    },
    {
      id: 'dummy-5',
      username: "DavidCohen",
      fullName: "David Cohen",
      profilePicture: "https://randomuser.me/api/portraits/men/44.jpg",
      comment: "Found a potential issue with the eruv wire near 34th Street. I've reported it in the app - can someone from the committee verify?",
      time: "5 hours ago"
    },
    {
      id: 'dummy-6',
      username: "Penn_Hillel",
      fullName: "Penn Hillel",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      comment: "Reminder: Eruv walking tour this Sunday at 2pm! Great for newcomers who want to understand the boundaries.",
      time: "5 hours ago",
      image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'dummy-7',
      username: "Rabbi_Goldstein",
      fullName: "Rabbi Goldstein",
      profilePicture: "https://randomuser.me/api/portraits/men/46.jpg",
      comment: "Community update: We're planning to extend the University City eruv next month to include more student housing. Volunteers needed for surveying!",
      time: "6 hours ago"
    },
    {
      id: 'alert-2',
      username: "Eruv_Watch",
      fullName: "Eruv Watch",
      profilePicture: "https://randomuser.me/api/portraits/men/47.jpg",
      comment: "⚠️ Weather Alert: Strong winds predicted for Saturday. Extra eruv checks will be performed Friday afternoon.",
      time: "6 hours ago",
      isAlert: true,
      alertType: 'weather',
    },
    {
      id: 'dummy-8',
      username: "Leah_S",
      fullName: "Leah Schwartz",
      profilePicture: "https://randomuser.me/api/portraits/women/48.jpg",
      comment: "Thank you to whoever fixed the broken wire on Walnut Street so quickly! Shabbat shalom to all.",
      time: "1 day ago"
    },
    {
      id: 'dummy-9',
      username: "EthanM",
      fullName: "Ethan Miller",
      profilePicture: "https://randomuser.me/api/portraits/men/49.jpg",
      comment: "I just used the new eruv reporting feature - super easy and helpful! Great update to the app.",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'alert-3',
      username: "University_Facilities",
      fullName: "University Facilities",
      profilePicture: "https://randomuser.me/api/portraits/men/50.jpg",
      comment: "⚠️ ALERT: Major construction on Walnut Street will impact the eruv poles next week. Inspections scheduled for Thursday.",
      time: "1 day ago",
      isAlert: true,
      alertType: 'general',
    },
    {
      id: 'alert-4',
      username: "Eruv_Inspector",
      fullName: "Eruv Inspector",
      profilePicture: "https://randomuser.me/api/portraits/men/51.jpg",
      comment: "⚠️ ALERT: Damage found to the northwestern section of the eruv boundary. Temporary repairs in place, but please verify before Shabbat.",
      time: "2 days ago",
      isAlert: true,
      alertType: 'breakage',
    },
    {
      id: 'alert-5',
      username: "Rabbi_Weinstein",
      fullName: "Rabbi Weinstein",
      profilePicture: "https://randomuser.me/api/portraits/men/52.jpg",
      comment: "⚠️ ALERT: The eruv in the Market Street area has been damaged by recent utility work. Repair team has been notified, expected fixed by Friday morning.",
      time: "3 day ago",
      isAlert: true,
      alertType: 'breakage',
    },
    {
      id: 'dummy-3',
      username: "JewishCampus",
      fullName: "Jewish Campus",
      profilePicture: "https://randomuser.me/api/portraits/men/53.jpg",
      comment: "Eruv check schedule for this month is now posted. Sign up to help!",
      time: "3 days ago",
      image: "https://images.unsplash.com/photo-1577033217221-2b949079c374?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 'dummy-10',
      username: "Community_Leader",
      fullName: "Community Leader",
      profilePicture: "https://randomuser.me/api/portraits/men/54.jpg",
      comment: "Fundraising update: We've reached 80% of our goal for the new eruv maintenance fund! Thank you to all who have contributed.",
      time: "3 days ago"
    },
  ];

  // Combine user posts with dummy posts
  const allPosts = [...posts, ...dummyPosts];
  
  // Split posts into alerts and regular posts
  const alertPosts = allPosts.filter(post => post.isAlert === true);
  const regularPosts = allPosts.filter(post => !post.isAlert);

  // Filter alerts based on selected filter
  const getFilteredAlerts = () => {
    if (alertFilter === 'all') return alertPosts;
    return alertPosts.filter(post => post.alertType === alertFilter);
  };

  // Get filtered alerts
  const filteredAlerts = getFilteredAlerts();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]} 
          onPress={() => setActiveTab(0)}
        >
          <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>
            Alerts ({alertPosts.length})
          </Text>
          {activeTab === 0 && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 1 && styles.activeTabButton]} 
          onPress={() => setActiveTab(1)}
        >
          <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>
            Posts ({regularPosts.length})
          </Text>
          {activeTab === 1 && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
      
      {/* Content based on active tab */}
      {activeTab === 0 ? (
        <>
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={[styles.filterButton, alertFilter === 'all' && styles.activeFilter]} 
                onPress={() => setAlertFilter('all')}
              >
                <Text style={[styles.filterText, alertFilter === 'all' && styles.activeFilterText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, alertFilter === 'weather' && styles.activeFilter]} 
                onPress={() => setAlertFilter('weather')}
              >
                <Ionicons name="thunderstorm" size={16} color={alertFilter === 'weather' ? Theme.colors.white : Theme.colors.gray[600]} />
                <Text style={[styles.filterText, alertFilter === 'weather' && styles.activeFilterText]}>Weather</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, alertFilter === 'breakage' && styles.activeFilter]} 
                onPress={() => setAlertFilter('breakage')}
              >
                <Ionicons name="alert-circle" size={16} color={alertFilter === 'breakage' ? Theme.colors.white : Theme.colors.gray[600]} />
                <Text style={[styles.filterText, alertFilter === 'breakage' && styles.activeFilterText]}>Breakage</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, alertFilter === 'repair' && styles.activeFilter]} 
                onPress={() => setAlertFilter('repair')}
              >
                <Ionicons name="construct" size={16} color={alertFilter === 'repair' ? Theme.colors.white : Theme.colors.gray[600]} />
                <Text style={[styles.filterText, alertFilter === 'repair' && styles.activeFilterText]}>Repairs</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, alertFilter === 'general' && styles.activeFilter]} 
                onPress={() => setAlertFilter('general')}
              >
                <Ionicons name="information-circle" size={16} color={alertFilter === 'general' ? Theme.colors.white : Theme.colors.gray[600]} />
                <Text style={[styles.filterText, alertFilter === 'general' && styles.activeFilterText]}>General</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredAlerts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No {alertFilter !== 'all' ? alertFilter : ''} alerts at this time</Text>
              </View>
            ) : (
              filteredAlerts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </ScrollView>
        </>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {regularPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No posts yet. Check back later!</Text>
            </View>
          ) : (
            regularPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: Theme.colors.background,
  },
  tabText: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '500',
    color: Theme.colors.gray[500],
  },
  activeTabText: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '50%',
    backgroundColor: Theme.colors.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.lg,
  },
  emptyState: {
    paddingVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[500],
    textAlign: 'center',
  },
  filterContainer: {
    paddingVertical: 8,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Theme.colors.gray[200],
  },
  activeFilter: {
    backgroundColor: Theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
    color: Theme.colors.gray[600],
  },
  activeFilterText: {
    color: Theme.colors.white,
    fontWeight: '600',
  },
});
