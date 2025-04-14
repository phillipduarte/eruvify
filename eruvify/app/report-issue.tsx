import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Modal, 
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
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

  // Camera and image states
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [mediaPermission, setMediaPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  // Using string instead of enum
  const [cameraType, setCameraType] = useState('back');
  const cameraRef = useRef(null);

  // Request camera and media library permissions on component mount
  useEffect(() => {
    (async () => {
      try {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

        setCameraPermission(cameraStatus.status === 'granted');
        setMediaPermission(mediaLibraryStatus.status === 'granted');

        if (cameraStatus.status !== 'granted') {
          Alert.alert(
            "Camera Permission Required",
            "Camera access is needed to capture images for reporting issues."
          );
        }
      } catch (err) {
        console.error("Error requesting permissions:", err);
        Alert.alert("Permission Error", "Failed to request necessary permissions.");
      }
    })();
  }, []);

  // Function to take a picture using the camera
  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not available");
      return;
    }
    
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setImage(photo.uri);
      setCameraVisible(false);

      // Save to media library only if we have permission
      if (mediaPermission) {
        try {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
        } catch (saveError) {
          console.error("Error saving to library:", saveError);
          // Continue even if saving to library fails
        }
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error", "Failed to capture image. Please try again.");
    }
  };

  // Function to pick an image from the device's library
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image from library.");
    }
  };

  // Function to handle opening the camera, checking permissions first
  const handleCameraOpen = () => {
    if (cameraPermission === null) {
      Alert.alert("Requesting Permissions", "Please wait or grant camera permissions.");
      return;
    }
    if (cameraPermission === false) {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required. Please enable it in your device settings."
      );
      return;
    }
    // If permission granted, show the camera modal
    setCameraVisible(true);
  };

  // Show options to the user: Take Photo or Choose from Library
  const showImageOptions = () => {
    Alert.alert(
      "Add Image",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: handleCameraOpen
        },
        {
          text: "Choose from Library",
          onPress: pickImage
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  // Function to handle submitting the report
  const handleSubmit = () => {
    if (!reportText || reportText.trim() === '') {
      Alert.alert("Missing Information", "Please describe the issue before submitting.");
      return;
    }

    // Create a new alert post object, including the image URI if available
    const newPost = {
      id: `report-${Date.now()}`,
      username: "Eruv Reporter",
      comment: reportText,
      time: "Just now",
      image: image,
      isAlert: true
    };

    try {
      // Add the post using the context function
      if (typeof addPost === 'function') {
        addPost(newPost);
        
        // Reset state
        setReportText('');
        setImage(null);
        
        // Navigate back safely
        try {
          router.back();
        } catch (navError) {
          console.error("Navigation error:", navError);
          // If back navigation fails, go to home tab
          router.replace('/(tabs)');
        }
      } else {
        console.error("addPost function is not available in context");
        Alert.alert("Error", "Could not submit the report.");
      }
    } catch (submitError) {
      console.error("Error submitting report:", submitError);
      Alert.alert("Error", "Failed to submit report. Please try again.");
    }
  };

  // Function to toggle camera type (front/back)
  const toggleCameraType = () => {
    setCameraType(current => (
      current === 'back' ? 'front' : 'back'
    ));
  };

  // Add a keyboard dismiss handler
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraVisible}
        onRequestClose={() => setCameraVisible(false)}
      >
        <SafeAreaView style={styles.cameraContainer}>
          {cameraPermission ? (
            <Camera
              style={styles.camera}
              type={cameraType as any} // Using 'any' bypasses type checking
              ref={cameraRef}
              // Remove ratio prop that may cause issues on some devices
            >
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  style={styles.cameraSwitchButton}
                  onPress={toggleCameraType}
                >
                  <FontAwesome name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={takePicture}
                >
                  <View style={styles.cameraButtonInner} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cameraCloseButton}
                  onPress={() => setCameraVisible(false)}
                >
                  <FontAwesome name="times" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View style={styles.noCameraAccess}>
              <Text style={styles.noCameraText}>Camera permission not granted</Text>
              <Button 
                title="Close" 
                variant="primary" 
                onPress={() => setCameraVisible(false)} 
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Main Report Issue UI - Now wrapped with TouchableWithoutFeedback */}
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                try {
                  router.back();
                } catch (e) {
                  router.replace('/(tabs)');
                }
              }}
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
            {/* Image Display Area */}
            {image ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: image }}
                  style={styles.capturedImage}
                />
                <TouchableOpacity
                  style={styles.changeImageButton}
                  onPress={showImageOptions}
                >
                  <FontAwesome name="camera" size={20} color="#fff" />
                  <Text style={styles.changeImageText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imagePlaceholder}
                onPress={showImageOptions}
              >
                <FontAwesome name="camera" size={40} color="#999" />
                <Text style={styles.placeholderText}>Tap to add image</Text>
              </TouchableOpacity>
            )}

            <TextInput
              style={styles.textInput}
              placeholder="Describe the issue here..."
              value={reportText}
              onChangeText={setReportText}
              multiline
              textAlignVertical="top"
              blurOnSubmit={true} // Helps with keyboard dismissal on submit
            />

            <Button
              title="Submit Report"
              variant="primary"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  cancelButton: {
    padding: 8,
    marginRight: 8,
  },
  progressContainer: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  progressRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  changeImageText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    minHeight: 120,
    marginBottom: 32,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'white',
  },
  cameraSwitchButton: {
    padding: 15,
  },
  cameraCloseButton: {
    padding: 15,
  },
  noCameraAccess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noCameraText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
  },
});