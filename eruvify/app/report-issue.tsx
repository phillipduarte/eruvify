import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  
  // Add state for the selected image
  const [imageUri, setImageUri] = useState<string | null>(null);
  
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
              // This would ideally open app settings but requires additional libraries
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
      setImageUri(result.assets[0].uri);
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
      setImageUri(result.assets[0].uri);
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
  
  const handleSubmit = () => {
    // Create a new alert post
    const reportPost = {
      id: Date.now(),
      username: "Current User",
      comment: reportText || "Issue reported with the eruv in this area",
      time: new Date().toLocaleTimeString(),
      image: imageUri || "https://via.placeholder.com/400x300",
      isAlert: true,
      alertType: 'breakage',
    };
    
    // Add the post to the global state
    addPost(reportPost);
    
    // Reset the form fields
    setReportText('');
    setImageUri(null);
    
    // Show a success message
    Alert.alert(
      "Report Submitted",
      "Thank you for your report! Your check route is paused.",
      [
        {
          text: "Return to Route",
          onPress: () => router.back()
        }
      ]
    );
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          <TouchableOpacity style={styles.imagePlaceholder} onPress={showImageOptions}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={showImageOptions}
                >
                  <FontAwesome name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <FontAwesome name="camera" size={40} color="#999" />
                <Text style={styles.placeholderText}>Tap to add image</Text>
              </>
            )}
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
    </TouchableWithoutFeedback>
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
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  changeImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});