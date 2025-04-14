import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import Card from '@/components/ui/Card';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar?: string;
}

interface Message {
  id: string;
  text: string;
  received: boolean;
  time: string;
}

export default function MessagesScreen() {
  // Sample conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Rabbi Cohen',
      lastMessage: 'Thanks for checking the north side eruv yesterday!',
      time: '10:30 AM',
      unread: true
    },
    {
      id: '2',
      name: 'Sarah Goldstein',
      lastMessage: 'Are you available to check the eruv on Cedar Ave this week?',
      time: 'Yesterday',
      unread: false
    },
    {
      id: '3',
      name: 'Community Group',
      lastMessage: 'David: I found a broken wire near the park entrance.',
      time: 'Tuesday',
      unread: true
    },
    {
      id: '4',
      name: 'Eruv Committee',
      lastMessage: 'Meeting scheduled for Sunday at 4pm to discuss maintenance.',
      time: 'Monday',
      unread: false
    },
    {
      id: '5',
      name: 'Michael Levy',
      lastMessage: 'Can you help me understand how to report an issue?',
      time: 'Last week',
      unread: false
    }
  ]);

  // Selected conversation for the chat view
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
  // Message input
  const [messageInput, setMessageInput] = useState('');

  // Sample messages for the selected conversation
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', text: 'Hello there! How is your eruv checking going?', received: true, time: '10:30 AM' },
    { id: 'm2', text: 'Going well! I\'m about halfway through my route.', received: false, time: '10:32 AM' },
    { id: 'm3', text: 'Great! Let me know if you encounter any issues.', received: true, time: '10:35 AM' },
    { id: 'm4', text: 'Will do. The weather is perfect today for checking.', received: false, time: '10:36 AM' },
    { id: 'm5', text: 'That\'s good news. Thanks for your dedication to this mitzvah!', received: true, time: '10:40 AM' },
  ]);

  // Handle selecting a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Mark as read when selected
    setConversations(conversations.map(c => 
      c.id === conversation.id ? {...c, unread: false} : c
    ));
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Create a new message
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageInput,
      received: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Add message to the list
    setMessages([...messages, newMessage]);
    
    // Clear input
    setMessageInput('');
  };

  if (selectedConversation) {
    // Chat view for selected conversation
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setSelectedConversation(null)}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <View style={styles.backButtonInner}>
                <FontAwesome name="arrow-left" size={22} color={Theme.colors.primary} />
                <Text style={styles.backButtonText}>Back</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatName}>{selectedConversation.name}</Text>
            </View>
            
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome name="info-circle" size={20} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesContainer}
            inverted={false}
            renderItem={({ item }) => (
              <View style={[
                styles.messageContainer,
                item.received ? styles.receivedContainer : styles.sentContainer
              ]}>
                <View style={[
                  styles.messageBubble,
                  item.received ? styles.receivedBubble : styles.sentBubble
                ]}>
                  <Text style={[
                    styles.messageText,
                    item.received ? styles.receivedText : styles.sentText
                  ]}>
                    {item.text}
                  </Text>
                </View>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
          />
          
          <View style={[styles.inputContainer, { paddingBottom: Platform.OS === 'ios' ? Theme.spacing.md + 20 : Theme.spacing.md }]}>
            <TouchableOpacity style={styles.attachButton}>
              <FontAwesome name="paperclip" size={20} color={Theme.colors.gray[500]} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Type a message..."
            />
            
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !messageInput.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleSendMessage}
              disabled={!messageInput.trim()}
            >
              <FontAwesome 
                name="send" 
                size={20} 
                color={messageInput.trim() ? Theme.colors.white : Theme.colors.gray[400]} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Conversations list view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card 
            style={{
              ...styles.conversationCard,
              ...(item.unread ? styles.unreadCard : {})
            }}
            variant="outline"
            padding={false}
          >
            <TouchableOpacity 
              style={styles.conversationButton}
              onPress={() => handleSelectConversation(item)}
            >
              <View style={styles.avatarContainer}>
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{item.name}</Text>
                  <Text style={styles.conversationTime}>{item.time}</Text>
                </View>
                <Text 
                  style={[
                    styles.conversationLastMessage,
                    item.unread && styles.unreadText
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.lastMessage}
                </Text>
              </View>
              
              {item.unread && <View style={styles.unreadIndicator} />}
            </TouchableOpacity>
          </Card>
        )}
      />
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
  listContainer: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.lg,
  },
  conversationCard: {
    marginBottom: Theme.spacing.md,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primary,
  },
  conversationButton: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
  },
  avatarContainer: {
    marginRight: Theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.gray[500],
  },
  conversationLastMessage: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
  },
  unreadText: {
    fontWeight: '600',
    color: Theme.colors.text,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.primary,
    alignSelf: 'center',
    marginLeft: Theme.spacing.sm,
  },
  // Chat view styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
  },
  backButton: {
    padding: Theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  chatHeaderInfo: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -45, // To keep the title centered despite the back button
  },
  chatName: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: Theme.spacing.sm,
  },
  messagesContainer: {
    padding: Theme.spacing.md,
    paddingBottom: 90, // Adjusted padding to account for input bar
  },
  messageContainer: {
    marginBottom: Theme.spacing.md,
    maxWidth: '80%',
  },
  receivedContainer: {
    alignSelf: 'flex-start',
  },
  sentContainer: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: Theme.spacing.md,
    borderRadius: 16,
  },
  receivedBubble: {
    backgroundColor: Theme.colors.gray[100],
    borderBottomLeftRadius: 4,
  },
  sentBubble: {
    backgroundColor: Theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: Theme.typography.fontSize.sm,
  },
  receivedText: {
    color: Theme.colors.text,
  },
  sentText: {
    color: Theme.colors.white,
  },
  messageTime: {
    fontSize: 10,
    color: Theme.colors.gray[500],
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
    // Add bottom margin to avoid tab bar
    marginBottom: Theme.layout.tabBarHeight,
  },
  attachButton: {
    marginRight: Theme.spacing.sm,
    padding: Theme.spacing.xs,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 8,
    fontSize: Theme.typography.fontSize.sm,
  },
  sendButton: {
    marginLeft: Theme.spacing.sm,
    backgroundColor: Theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Theme.colors.gray[200],
  },
});