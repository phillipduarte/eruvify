import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/hooks/useAppContext';
import PostCard from '@/components/PostCard';
import Theme from '@/constants/Theme';

export default function HomeScreen() {
  const { posts } = useAppContext();
  const [activeTab, setActiveTab] = useState(0); // 0 = Alerts, 1 = All Posts
  
  // Dummy posts data as fallback
  const dummyPosts = [
    {
      id: 'dummy-2',
      username: "Rabbi_David",
      comment: "Important community announcement: The eruv near Cedar Park has been repaired. Thanks to our volunteers!",
      time: "20 minuets ago",
      isAlert: true
    },
    {
      id: 'dummy-1',
      username: "Sarah_J",
      comment: "Just checked my eruv using the app - all clear for this Shabbat!",
      time: "1 hours ago",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2576&auto=format&fit=crop"
    },
    {
      id: 'alert-6',
      username: "Eruv_Committee",
      comment: "⚠️ URGENT ALERT: Due to fallen trees from last night's storm, sections of the eruv along Chestnut Street are down. Status: NOT KOSHER for this Shabbat in affected areas.",
      time: "2 hours ago",
      isAlert: true
    },
    {
      id: 'dummy-4',
      username: "Rebecca_L",
      comment: "Question: Is anyone else having trouble viewing the map in the northwest section?",
      time: "3 hours ago"
    },
    {
      id: 'alert-1',
      username: "Eruv Committee",
      comment: "⚠️ ALERT: The eruv on Spruce Street is down due to construction. Please check status before Shabbat.",
      time: "3 hours ago",
      isAlert: true
    },
    // New dummy posts
    {
      id: 'dummy-5',
      username: "DavidCohen",
      comment: "Found a potential issue with the eruv wire near 34th Street. I've reported it in the app - can someone from the committee verify?",
      time: "5 hours ago"
    },
    {
      id: 'dummy-6',
      username: "Penn_Hillel",
      comment: "Reminder: Eruv walking tour this Sunday at 2pm! Great for newcomers who want to understand the boundaries.",
      time: "5 hours ago",
      image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'dummy-7',
      username: "Rabbi_Goldstein",
      comment: "Community update: We're planning to extend the University City eruv next month to include more student housing. Volunteers needed for surveying!",
      time: "6 hours ago"
    },
    {
      id: 'alert-2',
      username: "Eruv_Watch",
      comment: "⚠️ Weather Alert: Strong winds predicted for Saturday. Extra eruv checks will be performed Friday afternoon.",
      time: "6 hours ago",
      isAlert: true
    },
    {
      id: 'dummy-8',
      username: "Leah_S",
      comment: "Thank you to whoever fixed the broken wire on Walnut Street so quickly! Shabbat shalom to all.",
      time: "1 day ago"
    },
    {
      id: 'dummy-9',
      username: "EthanM",
      comment: "I just used the new eruv reporting feature - super easy and helpful! Great update to the app.",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'alert-3',
      username: "University_Facilities",
      comment: "⚠️ ALERT: Major construction on Walnut Street will impact the eruv poles next week. Inspections scheduled for Thursday.",
      time: "1 day ago",
      isAlert: true
    },
    {
      id: 'alert-4',
      username: "Eruv_Inspector",
      comment: "⚠️ ALERT: Damage found to the northwestern section of the eruv boundary. Temporary repairs in place, but please verify before Shabbat.",
      time: "2 days ago",
      isAlert: true
    },
    {
      id: 'alert-5',
      username: "Rabbi_Weinstein",
      comment: "⚠️ ALERT: The eruv in the Market Street area has been damaged by recent utility work. Repair team has been notified, expected fixed by Friday morning.",
      time: "3 day ago",
      isAlert: true
    },
    {
      id: 'dummy-3',
      username: "JewishCampus",
      comment: "Eruv check schedule for this month is now posted. Sign up to help!",
      time: "3 days ago",
      image: "https://images.unsplash.com/photo-1577033217221-2b949079c374?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 'dummy-10',
      username: "Community_Leader",
      comment: "Fundraising update: We've reached 80% of our goal for the new eruv maintenance fund! Thank you to all who have contributed.",
      time: "3 days ago"
    },
  ];

  // Combine user posts with dummy posts
  const allPosts = [...posts, ...dummyPosts];
  
  // Split posts into alerts and regular posts
  const alertPosts = allPosts.filter(post => post.isAlert === true);
  const regularPosts = allPosts.filter(post => !post.isAlert);

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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {alertPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No alerts at this time</Text>
            </View>
          ) : (
            alertPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </ScrollView>
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
});
