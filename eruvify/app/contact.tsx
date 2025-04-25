import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import Theme from '@/constants/Theme';
import Card from '@/components/ui/Card';

interface ContactInfo {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  description?: string;
}

export default function ContactScreen() {
  // Sample contact data - replace with actual contacts
  const contacts: ContactInfo[] = [
    {
      id: '1',
      name: 'Rabbi David Cohen',
      role: 'Overseeing Rabbi',
      phone: '(215) 555-1234',
      email: 'rabbi.cohen@example.com',
      description: 'Responsible for halachic decisions regarding the eruv'
    },
    {
      id: '2',
      name: 'Sarah Goldstein',
      role: 'Eruv Manager',
      phone: '(215) 555-5678',
      email: 'sgoldstein@example.com',
      description: 'Coordinates eruv checks and maintenance'
    },
    {
      id: '3',
      name: 'Michael Levy',
      role: 'Eruv Committee Chair',
      phone: '(215) 555-9012',
      email: 'mlevy@example.com',
      description: 'Oversees eruv committee activities and fundraising'
    },
    {
      id: '4',
      name: 'Emergency Eruv Hotline',
      role: 'Emergency Contact',
      phone: '(215) 555-3456',
      email: 'emergency@example.com',
      description: 'For urgent eruv issues, especially before Shabbat'
    }
  ];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Important Contacts</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionDescription}>
          These contacts can help with questions about the eruv, reporting issues, or getting involved with maintenance.
        </Text>
        
        {contacts.map(contact => (
          <Card key={contact.id} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRole}>{contact.role}</Text>
              </View>
            </View>
            
            {contact.description && (
              <Text style={styles.contactDescription}>{contact.description}</Text>
            )}
            
            <View style={styles.contactActions}>
              <TouchableOpacity 
                style={styles.contactButton} 
                onPress={() => handleCall(contact.phone)}
              >
                <FontAwesome name="phone" size={20} color={Theme.colors.primary} />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleEmail(contact.email)}
              >
                <FontAwesome name="envelope" size={20} color={Theme.colors.primary} />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
      
      <View style={styles.bottomBackContainer}>
        <TouchableOpacity 
          style={styles.bottomBackButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="chevron-left" size={16} color={Theme.colors.white} />
          <Text style={styles.bottomBackText}>Return to Previous Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: Theme.colors.text,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
  },
  backText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  sectionDescription: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[600],
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
  },
  contactCard: {
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  contactName: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  contactRole: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  contactDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  contactActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
    paddingTop: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    marginRight: Theme.spacing.md,
  },
  contactButtonText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  bottomBackContainer: {
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray[200],
  },
  bottomBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: 8,
  },
  bottomBackText: {
    marginLeft: 8,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.white,
    fontWeight: '500',
  },
});