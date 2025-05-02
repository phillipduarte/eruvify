import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '@/hooks/useAppContext';
import Button from '@/components/ui/Button';
import Theme from '@/constants/Theme';

export default function TripEndScreen() {
  const { 
    comment, 
    setComment, 
    uploadedImage, 
    setUploadedImage,
    handlePostSubmit
  } = useAppContext();

  // Check permissions when component mounts
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (libraryStatus !== 'granted' && cameraStatus !== 'granted') {
          Alert.alert(
            'Permissions Required',
            'This app needs camera and photo library permissions to function properly.',
            [{ text: 'OK' }]
          );
        }
      }
    })();
  }, []);

  // Function to pick an image from the library
  const pickImage = async () => {
    // Request permission again just to be sure
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need photo library permissions to make this work!',
        [
          { text: 'Cancel' },
          { 
            text: 'Open Settings', 
            onPress: () => {
              Alert.alert('Please open Settings app and enable permissions for this app.');
            }
          }
        ]
      );
      return;
    }
    
    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploadedImage(result.assets[0].uri);
    }
  };
  
  // Function to take a photo with the camera
  const takePhoto = async () => {
    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera permissions to make this work!',
        [
          { text: 'Cancel' },
          { 
            text: 'Open Settings', 
            onPress: () => {
              Alert.alert('Please open Settings app and enable camera permissions for this app.');
            }
          }
        ]
      );
      return;
    }
    
    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploadedImage(result.assets[0].uri);
    }
  };
  
  // Show image option dialog
  const showImageOptions = () => {
    Alert.alert(
      'Add Image',
      'Choose an option to add an image:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage }
      ]
    );
  };
  
  const onSubmit = () => {
    handlePostSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Route Completed!</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <FontAwesome name="times" size={24} color={Theme.colors.gray[700]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.completeContainer}>
            <Image 
              source={require('@/assets/images/great-job-star.png')} 
              style={styles.successIcon}
              resizeMode="contain"
            />
            <Text style={styles.completeText}>Great job checking the eruv!</Text>
            <Text style={styles.statsText}>You walked 0.7 miles in 23 minutes.</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Add a comment about your route check:</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Everything looked good, no issues found..."
              value={comment}
              onChangeText={setComment}
              multiline
              textAlignVertical="top"
            />
            
            <Text style={styles.label}>Add a photo (optional):</Text>
            {uploadedImage ? (
              <TouchableOpacity 
                style={styles.imagePreviewContainer}
                onPress={showImageOptions}
              >
                <Image 
                  source={{ uri: uploadedImage }} 
                  style={styles.imagePreview} 
                />
                <View style={styles.changeImageButton}>
                  <FontAwesome name="camera" size={16} color={Theme.colors.white} />
                  <Text style={styles.changeImageText}>Change</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={showImageOptions}
              >
                <FontAwesome name="camera" size={30} color={Theme.colors.gray[500]} />
                <Text style={styles.uploadText}>Tap to upload an image</Text>
              </TouchableOpacity>
            )}
            
            <Button
              title="Post Your Update"
              onPress={onSubmit}
              variant="primary"
              size="large"
              fullWidth
              style={styles.submitButton}
            />
            
            <Text style={styles.skipText}>
              Or{' '}
              <Text 
                style={styles.skipLink}
                onPress={() => {
                  // Reset state and go back to home
                  setComment('');
                  setUploadedImage(null);
                  router.push('/(tabs)');
                }}
              >
                skip this step
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  closeButton: {
    padding: Theme.spacing.xs,
  },
  completeContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  successIcon: {
    width: 120,
    height: 120,
  },
  completeText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  statsText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[600],
  },
  formContainer: {
    paddingBottom: Theme.spacing.xl,
  },
  label: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '500',
    marginBottom: Theme.spacing.sm,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    height: 120,
    marginBottom: Theme.spacing.lg,
    fontSize: Theme.typography.fontSize.md,
  },
  uploadButton: {
    height: 160,
    backgroundColor: Theme.colors.gray[100],
    borderWidth: 2,
    borderColor: Theme.colors.gray[300],
    borderStyle: 'dashed',
    borderRadius: Theme.sizes.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  uploadText: {
    marginTop: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[500],
  },
  imagePreviewContainer: {
    position: 'relative',
    height: 200,
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.sizes.borderRadius.md,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
    borderRadius: Theme.sizes.borderRadius.sm,
  },
  changeImageText: {
    color: Theme.colors.white,
    marginLeft: 6,
    fontSize: Theme.typography.fontSize.sm,
  },
  submitButton: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  skipText: {
    textAlign: 'center',
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
  },
  skipLink: {
    color: Theme.colors.primary,
    textDecorationLine: 'underline',
  },
});