import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Post } from '@/context/AppContext';
import Theme from '@/constants/Theme';
import Card from './ui/Card';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { username, comment, time, image, isAlert } = post;

  return (
    <Card 
      style={{
        ...styles.container,
        ...(isAlert ? styles.alertContainer : {})
      }}
      variant="elevated"
    >
      <View style={styles.header}>
        {isAlert && (
          <View style={styles.alertBadge}>
            <Text style={styles.alertText}>ALERT</Text>
          </View>
        )}
        <Text style={styles.username}>{username}</Text>
      </View>
      
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      )}
      
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.time}>{time}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  alertContainer: {
    backgroundColor: Theme.colors.alertBackground,
    borderWidth: 1,
    borderColor: Theme.colors.alert,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  alertBadge: {
    backgroundColor: Theme.colors.alert,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.sizes.borderRadius.xs,
    marginRight: Theme.spacing.sm,
  },
  alertText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: 'bold',
  },
  username: {
    fontWeight: 'bold',
    fontSize: Theme.typography.fontSize.md,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: Theme.sizes.borderRadius.sm,
    marginVertical: Theme.spacing.sm,
  },
  comment: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.sm,
  },
  time: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.gray[600],
  },
});