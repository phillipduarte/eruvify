import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';

// Define types for our props and data
interface Comment {
  id: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  comment: string;
  time: string;
  image?: string;
  isAlert?: boolean;
  alertType?: 'weather' | 'breakage' | 'repair' | 'general';
  likes?: number;
  comments?: Comment[];
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Set initial state
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState('');
  
  // Handle like toggle
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  // Add new comment
  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      username: 'CurrentUser', // In a real app, get this from auth
      fullName: 'Current User', // In a real app, get this from auth
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get alert style based on alert type
  const getAlertStyle = () => {
    if (!post.isAlert) return null;
    
    switch (post.alertType) {
      case 'weather':
        return styles.weatherAlert;
      case 'breakage':
        return styles.breakageAlert;
      case 'repair':
        return styles.repairAlert;
      case 'general':
      default:
        return styles.generalAlert;
    }
  };
  
  // Get alert icon based on alert type
  const getAlertIcon = () => {
    if (!post.isAlert) return null;
    
    switch (post.alertType) {
      case 'weather':
        return <Ionicons name="thunderstorm" size={18} color="#D97706" style={styles.alertIcon} />;
      case 'breakage':
        return <Ionicons name="alert-circle" size={18} color="#DC2626" style={styles.alertIcon} />;
      case 'repair':
        return <Ionicons name="construct" size={18} color="#059669" style={styles.alertIcon} />;
      case 'general':
      default:
        return <Ionicons name="information-circle" size={18} color="#2563EB" style={styles.alertIcon} />;
    }
  };

  return (
    <View style={[
      styles.card, 
      post.isAlert ? styles.alertCard : null,
      getAlertStyle()
    ]}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          {/* Profile picture - show image if available, otherwise fallback to initials */}
          {post.profilePicture ? (
            <Image 
              source={{ uri: post.profilePicture }} 
              style={styles.avatar} 
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>{post.username.charAt(0)}</Text>
            </View>
          )}
          
          <View>
            {/* Now show both full name and username */}
            {post.fullName && (
              <Text style={styles.fullName}>{post.fullName}</Text>
            )}
            <Text style={styles.username}>@{post.username}</Text>
            <Text style={styles.timestamp}>{post.time}</Text>
          </View>
        </View>
        
        {post.isAlert && (
          <View style={styles.alertTypeLabel}>
            {getAlertIcon()}
            <Text style={styles.alertTypeText}>
              {post.alertType ? post.alertType.charAt(0).toUpperCase() + post.alertType.slice(1) : 'Alert'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.commentText}>{post.comment}</Text>
        
        {post.image && (
          <Image 
            source={{ uri: post.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.interactionBar}>
        <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={22} 
            color={liked ? Theme.colors.error : Theme.colors.gray[500]} 
          />
          <Text style={styles.interactionText}>
            {likesCount > 0 ? likesCount : ''} {likesCount === 1 ? 'Like' : (likesCount > 1 ? 'Likes' : 'Like')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.interactionButton} onPress={toggleExpanded}>
          <Ionicons 
            name="chatbubble-outline" 
            size={20} 
            color={Theme.colors.gray[500]} 
          />
          <Text style={styles.interactionText}>
            {comments.length > 0 ? comments.length : ''} {comments.length === 1 ? 'Comment' : 'Comments'}
          </Text>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.commentsSection}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                {/* Comment profile picture - show image if available, otherwise fallback to initials */}
                {comment.profilePicture ? (
                  <Image 
                    source={{ uri: comment.profilePicture }} 
                    style={styles.commentAvatar} 
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.commentAvatarFallback}>
                    <Text style={styles.commentAvatarText}>{comment.username.charAt(0)}</Text>
                  </View>
                )}
                
                <View style={styles.commentContent}>
                  {/* Show both fullName (if available) and username for comments too */}
                  <View style={styles.commentHeader}>
                    {comment.fullName && (
                      <Text style={styles.commentFullName}>{comment.fullName}</Text>
                    )}
                    <Text style={styles.commentUsername}>@{comment.username}</Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.text}</Text>
                  <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentsText}>No comments yet. Be the first!</Text>
          )}
          
          <View style={styles.addCommentSection}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.addCommentButton} 
              onPress={handleAddComment}
              disabled={newComment.trim() === ''}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={newComment.trim() === '' ? Theme.colors.gray[400] : Theme.colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  alertCard: {
    backgroundColor: '#FFF9EB',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  weatherAlert: {
    backgroundColor: '#FEF3C7', // Amber 50
    borderLeftColor: '#D97706', // Amber 600
  },
  breakageAlert: {
    backgroundColor: '#FEE2E2', // Red 50
    borderLeftColor: '#DC2626', // Red 600
  },
  repairAlert: {
    backgroundColor: '#ECFDF5', // Green 50
    borderLeftColor: '#059669', // Green 600
  },
  generalAlert: {
    backgroundColor: '#EFF6FF', // Blue 50
    borderLeftColor: '#2563EB', // Blue 600
  },
  alertTypeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  alertIcon: {
    marginRight: 4,
  },
  alertTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: Theme.colors.gray[500],
  },
  timestamp: {
    fontSize: 12,
    color: Theme.colors.gray[500],
    marginTop: 2,
  },
  content: {
    marginBottom: 12,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    color: Theme.colors.text,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  interactionBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
    paddingTop: 12,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 6,
  },
  interactionText: {
    marginLeft: 6,
    fontSize: 14,
    color: Theme.colors.gray[600],
  },
  commentsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentAvatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  commentAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
    backgroundColor: Theme.colors.gray[100],
    borderRadius: 16,
    padding: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  commentFullName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  commentUsername: {
    fontSize: 12,
    color: Theme.colors.gray[500],
  },
  commentBody: {
    fontSize: 14,
    marginTop: 2,
  },
  commentTimestamp: {
    fontSize: 12,
    color: Theme.colors.gray[500],
    marginTop: 4,
  },
  noCommentsText: {
    color: Theme.colors.gray[500],
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 12,
  },
  addCommentSection: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.colors.gray[300],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
  },
  addCommentButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});