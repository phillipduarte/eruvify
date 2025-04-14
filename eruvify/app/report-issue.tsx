import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/useAppContext';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Theme from '@/constants/Theme';

export default function ReportIssueScreen() {
  const { 
    reportText, 
    setReportText, 
    totalDistance, 
    progressPercent,
    addPost
  } = useAppContext();
  
  const handleSubmit = () => {
    // Create a new alert post
    const reportPost = {
      id: Date.now(),
      username: "Eruv Alert",
      comment: reportText || "Issue reported with the eruv in this area",
      time: new Date().toLocaleTimeString(),
      image: "https://via.placeholder.com/400x300", // Replace with actual image path
      isAlert: true
    };
    
    // Add the post to the global state
    addPost(reportPost);
    
    // Reset the report text
    setReportText('');
    
    // Navigate back
    router.back();
    
    // Navigate to the home screen to see the post
    setTimeout(() => {
      router.push('/(tabs)');
    }, 500);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="times" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progress</Text>
          <ProgressBar progress={progressPercent} />
          <View style={styles.progressRange}>
            <Text style={styles.rangeText}>0.0 mi</Text>
            <Text style={styles.rangeText}>{totalDistance} mi</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity style={styles.imagePlaceholder}>
          <FontAwesome name="camera" size={40} color="#999" />
          <Text style={styles.placeholderText}>Tap to capture image</Text>
        </TouchableOpacity>
        
        <TextInput 
          style={styles.textInput}
          placeholder="Describe your issue here"
          value={reportText}
          onChangeText={setReportText}
          multiline
          textAlignVertical="top"
        />
        
        <Button 
          title="Submit Report"
          variant="primary"
          onPress={handleSubmit}
          fullWidth
        />
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
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  cancelButton: {
    padding: Theme.spacing.sm,
  },
  progressContainer: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  progressLabel: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.xs,
  },
  progressRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.xs,
  },
  rangeText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.gray[600],
  },
  content: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: Theme.colors.gray[200],
    borderRadius: Theme.sizes.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  placeholderText: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.gray[600],
  },
  textInput: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    minHeight: 120,
    marginBottom: Theme.spacing.xl,
    fontSize: Theme.typography.fontSize.md,
  },
});