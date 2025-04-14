import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/hooks/useAppContext';
import PostCard from '@/components/PostCard';
import Theme from '@/constants/Theme';

export default function HomeScreen() {
  const { posts } = useAppContext();
  
  // Dummy posts data as fallback
  const dummyPosts = [
    {
      id: 'dummy-1',
      username: "Sarah_J",
      comment: "Just checked my eruv using the app - all clear for this Shabbat!",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2576&auto=format&fit=crop"
    },
    {
      id: 'dummy-2',
      username: "Rabbi_David",
      comment: "Important community announcement: The eruv near Cedar Park has been repaired. Thanks to our volunteers!",
      time: "5 hours ago",
      isAlert: true
    },
    {
      id: 'dummy-3',
      username: "JewishCampus",
      comment: "Eruv check schedule for this month is now posted. Sign up to help!",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1577033217221-2b949079c374?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 'dummy-4',
      username: "Rebecca_L",
      comment: "Question: Is anyone else having trouble viewing the map in the northwest section?",
      time: "2 days ago"
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
      time: "6 hours ago"
    },
    {
      id: 'dummy-6',
      username: "Penn_Hillel",
      comment: "Reminder: Eruv walking tour this Sunday at 2pm! Great for newcomers who want to understand the boundaries.",
      time: "10 hours ago",
      image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'dummy-7',
      username: "Rabbi_Goldstein",
      comment: "Community update: We're planning to extend the University City eruv next month to include more student housing. Volunteers needed for surveying!",
      time: "1 day ago"
    },
    {
      id: 'alert-2',
      username: "Eruv_Watch",
      comment: "⚠️ Weather Alert: Strong winds predicted for Saturday. Extra eruv checks will be performed Friday afternoon.",
      time: "4 hours ago",
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
      id: 'dummy-10',
      username: "Community_Leader",
      comment: "Fundraising update: We've reached 80% of our goal for the new eruv maintenance fund! Thank you to all who have contributed.",
      time: "3 days ago"
    }
  ];

  // Combine user posts with dummy posts - user posts appear first
  const displayPosts = [...posts, ...dummyPosts];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No posts yet. Check back later!</Text>
          </View>
        ) : (
          displayPosts.map(post => (
            <PostCard key={post.id.toString()} post={post} />
          ))
        )}
      </ScrollView>
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
  scrollContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxxl,
  },
  emptyStateText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[500],
    textAlign: 'center',
  },
});
