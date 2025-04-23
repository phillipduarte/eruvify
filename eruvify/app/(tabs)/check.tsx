import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useAppContext } from '@/hooks/useAppContext';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Theme from '@/constants/Theme';

// Import MapView and Polyline
import MapView, { Polyline, Marker, Region } from 'react-native-maps';

export default function CheckScreen() {
  // Add reference to the map to allow programmatic control
  const mapRef = useRef(null);
  // Store location subscription for cleanup
  const locationSubscription = useRef(null);
  
  const { 
    isStarted,
    setIsStarted,
    isFinished,
    setIsFinished,
    distanceWalked,
    setDistanceWalked,
    totalDistance,
    progressPercent,
    hasStartedBefore,
    setHasStartedBefore,
    isReporting,
    setIsReporting
  } = useAppContext();

  // Local state to track if we navigated away to report
  const [navigatedToReport, setNavigatedToReport] = useState(false);
  
  // Add state for user location
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  
  // Define the route coordinates
  // Original route coordinates (commented out for later use)
  // const routeCoordinates = [
  //   { latitude: 39.962043, longitude: -75.199447 },
  //   { latitude: 39.963169, longitude: -75.199657 },
  //   { latitude: 39.964476, longitude: -75.187672 },
  // ];
  
  // Updated route coordinates
  const routeCoordinates = [
    { latitude: 39.951622, longitude: -75.201554 },
    { latitude: 39.951326, longitude: -75.199328 },
  ];
  
  // Set initial region based on route
  const [initialRegion, setInitialRegion] = useState({
    // Center point of the route
    // latitude: 39.963229,  // Average of original route latitudes
    // longitude: -75.195592, // Average of original route longitudes
    latitude: 39.951474,  // Average of new route latitudes
    longitude: -75.200441, // Average of new route longitudes
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  
  // Add these near your other state variables
  const [completedCoordinates, setCompletedCoordinates] = useState([]);
  const [remainingCoordinates, setRemainingCoordinates] = useState(routeCoordinates);

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = coord1.latitude * Math.PI / 180;
    const lat2 = coord2.latitude * Math.PI / 180;
    const deltaLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const deltaLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
  
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // distance in meters
  
    return distance;
  };
  
  // Function to calculate the closest point on a line segment
  const findClosestPointOnSegment = (userCoord, segmentStart, segmentEnd) => {
    // Convert to simpler variables for readability
    const x = userCoord.longitude;
    const y = userCoord.latitude;
    const x1 = segmentStart.longitude;
    const y1 = segmentStart.latitude;
    const x2 = segmentEnd.longitude;
    const y2 = segmentEnd.latitude;
  
    // Calculate the segment length squared
    const segmentLengthSq = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    
    if (segmentLengthSq === 0) {
      // Return the start point if segment is a point
      return { latitude: y1, longitude: x1 };
    }
    
    // Calculate projection
    const t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / segmentLengthSq;
    
    // Clamp to segment
    const tClamped = Math.max(0, Math.min(1, t));
    
    // Calculate the closest point
    return {
      latitude: y1 + tClamped * (y2 - y1),
      longitude: x1 + tClamped * (x2 - x1)
    };
  };
  
  // Function to update route progress based on user location
  const updateRouteProgress = (userCoord) => {
    if (!userCoord || routeCoordinates.length < 2) return;
  
    // Find which segment of the route the user is closest to
    let minDistance = Infinity;
    let closestSegmentIndex = 0;
    let closestPoint = null;
  
    for (let i = 0; i < routeCoordinates.length - 1; i++) {
      const segmentStart = routeCoordinates[i];
      const segmentEnd = routeCoordinates[i+1];
      const pointOnSegment = findClosestPointOnSegment(userCoord, segmentStart, segmentEnd);
      
      const distance = calculateDistance(userCoord, pointOnSegment);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSegmentIndex = i;
        closestPoint = pointOnSegment;
      }
    }
  
    // If user is very close to the route (within 50 meters)
    if (minDistance < 50) {
      // Calculate progress along the route
      let totalRouteDistance = 0;
      let completedDistance = 0;
  
      // Calculate total route distance
      for (let i = 0; i < routeCoordinates.length - 1; i++) {
        totalRouteDistance += calculateDistance(routeCoordinates[i], routeCoordinates[i+1]);
        
        if (i < closestSegmentIndex) {
          completedDistance += calculateDistance(routeCoordinates[i], routeCoordinates[i+1]);
        }
      }
  
      // Add distance from start of current segment to closest point
      if (closestPoint) {
        completedDistance += calculateDistance(routeCoordinates[closestSegmentIndex], closestPoint);
      }
  
      // Calculate completion percentage
      const newProgressPercent = Math.min(100, (completedDistance / totalRouteDistance) * 100);
      
      // Update application state
      const progressDistanceWalked = (totalDistance * newProgressPercent) / 100;
      setDistanceWalked(progressDistanceWalked);
      
      // Split coordinates into completed and remaining
      const completed = [...routeCoordinates.slice(0, closestSegmentIndex + 1)];
      if (closestPoint) {
        completed.push(closestPoint);
      }
      
      const remaining = [closestPoint, ...routeCoordinates.slice(closestSegmentIndex + 1)];
      
      setCompletedCoordinates(completed);
      setRemainingCoordinates(remaining);
    }
  };

  // Request location permissions and get initial location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        try {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
          setMapReady(true);
        } catch (error) {
          console.error("Error getting location:", error);
        }
      }
    })();
  }, []);
  
  // Start/stop watching location based on isStarted state
  useEffect(() => {
    // Start continuous location updates when route is started
    if (isStarted && locationPermission) {
      const startLocationTracking = async () => {
        try {
          // Clean up any existing subscription
          if (locationSubscription.current) {
            locationSubscription.current.remove();
          }
          
          // Start new location subscription with higher accuracy
          const subscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.BestForNavigation,
              distanceInterval: 5, // Update every 5 meters
              timeInterval: 3000,  // Or at least every 3 seconds
            },
            (location) => {
              const { coords } = location;
              setUserLocation(coords);
              
              // Center map on user automatically
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.007,  // Zoom in more for better tracking
                  longitudeDelta: 0.007,
                }, 500);
              }
              
              // Update route progress
              updateRouteProgress(coords);
            }
          );
          
          locationSubscription.current = subscription;
        } catch (error) {
          console.error('Error starting location tracking:', error);
        }
      };
      
      startLocationTracking();
    } else {
      // Stop watching location when route is paused/stopped
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    }
    
    // Clean up subscription when component unmounts
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    };
  }, [isStarted, locationPermission]);
  
  // Function to center the map on user's location
  const centerMapOnUser = () => {
    if (userLocation && mapRef.current) {
      // Animate to user's location
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000); // 1000ms animation duration
    }
  };
  
  // Handle the start button press - start tracking and center on user
  const handleStart = () => {
    setIsStarted(true);
    setHasStartedBefore(true);
    setCompletedCoordinates([]);
    setRemainingCoordinates(routeCoordinates);
    centerMapOnUser();
  };
  
  // Navigate to trip end screen when finished
  useEffect(() => {
    if (isFinished) {
      router.push('/trip-end');
    }
  }, [isFinished]);
  
  // Use useFocusEffect instead of useEffect to properly handle focus changes
  useFocusEffect(
    useCallback(() => {
      // When screen is focused and we had navigated to report
      if (navigatedToReport) {
        console.log("Resetting reporting state after return from report screen");
        setIsReporting(false);
        setNavigatedToReport(false);
      }
    }, [navigatedToReport, setIsReporting])
  );
  
  // Handle reporting issue - set state and navigate
  const handleReportIssue = () => {
    setIsReporting(true);
    setNavigatedToReport(true);
    router.push('/report-issue');
  };

  // Render map if available
  const renderMap = () => {
    if (!mapReady) {
      return (
        <View style={[styles.mapImage, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Map loading...</Text>
        </View>
      );
    }

    try {
      return (
        <MapView
          ref={mapRef}
          style={styles.mapImage}
          initialRegion={initialRegion}
          showsUserLocation={locationPermission}
          showsMyLocationButton={true}
          followsUserLocation={isStarted}
          onMapReady={() => console.log("Map is ready")}
        >
          {/* Draw the completed part of the route */}
          {isStarted && completedCoordinates.length > 1 && (
            <Polyline
              coordinates={completedCoordinates}
              strokeColor="#000000" // Black color for completed
              strokeWidth={6}
              lineDashPattern={[0]}
              zIndex={2} // Higher z-index to show above remaining route
            />
          )}
          
          {/* Draw the remaining part of the route */}
          {isStarted && remainingCoordinates.length > 1 ? (
            <Polyline
              coordinates={remainingCoordinates}
              strokeColor="#3B82F6" // Blue color for remaining
              strokeWidth={4}
              lineDashPattern={[0]}
              zIndex={1}
            />
          ) : (
            // Show the full route when not started
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#3B82F6" // Blue color
              strokeWidth={4}
              lineDashPattern={[0]}
            />
          )}
          
          {/* Mark start point */}
          <Marker
            coordinate={routeCoordinates[0]}
            title="Start"
            pinColor="green"
          />
          
          {/* Mark end point */}
          <Marker
            coordinate={routeCoordinates[routeCoordinates.length - 1]}
            title="End"
            pinColor="red"
          />
        </MapView>
      );
    } catch (error) {
      console.error("Error rendering map:", error);
      return (
        <View style={[styles.mapImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
          <Text>Unable to load map</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Route Today</Text>
      
      {!isStarted ? (
        <View style={styles.preStartContainer}>
          <Text style={styles.assignmentTitle}>Your Assignment</Text>
          <Text style={styles.assignmentDistance}>{totalDistance} Miles</Text>
          
          <View style={styles.mapPlaceholder}>
            {renderMap()}
          </View>
          
          <Button 
            title={hasStartedBefore ? "Restart" : "Start"}
            variant="primary"
            size="large"
            onPress={handleStart}
            style={styles.startButton}
          />
          
          <Button 
            title="Request route change"
            variant="outline"
            onPress={() => router.push('/route-change')}
            style={styles.changeButton}
          />
        </View>
      ) : (
        <View style={styles.inProgressContainer}>
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>Progress</Text>
            <ProgressBar progress={progressPercent} />
            <View style={styles.progressRange}>
              <Text style={styles.rangeText}>0.0 mi</Text>
              <Text style={styles.rangeText}>{totalDistance} mi</Text>
            </View>
          </View>
          
          <View style={styles.mapContainer}>
            {renderMap()}
            
            <View style={styles.distanceOverlay}>
              <Text style={styles.distanceText}>
                {distanceWalked.toFixed(1)} / {totalDistance} miles
              </Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Pause"
              variant="secondary"
              onPress={() => setIsStarted(false)}
              style={styles.pauseButton}
            />
            
            <Button 
              title="Report Issue"
              variant="danger"
              onPress={handleReportIssue}
              style={styles.reportButton}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  // Pre-start styles
  preStartContainer: {
    flex: 1,
    alignItems: 'center',
    padding: Theme.spacing.lg,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.md, // Added bottom padding for tab bar
  },
  assignmentTitle: {
    fontSize: Theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    marginTop: Theme.spacing.md,
  },
  assignmentDistance: {
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.gray[600],
    marginVertical: Theme.spacing.sm,
  },
  mapPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: Theme.colors.gray[200],
    borderRadius: Theme.sizes.borderRadius.md,
    marginVertical: Theme.spacing.xl,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  startButton: {
    marginBottom: Theme.spacing.md,
    width: '100%',
  },
  changeButton: {
    width: '100%',
  },
  // In progress styles
  inProgressContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
    paddingBottom: Theme.layout.tabBarHeight + Theme.spacing.md, // Added bottom padding for tab bar
  },
  progressSection: {
    marginBottom: Theme.spacing.lg,
  },
  progressLabel: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
  },
  progressRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.xs,
  },
  rangeText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
  },
  mapContainer: {
    flex: 1,
    borderRadius: Theme.sizes.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Theme.spacing.lg,
  },
  distanceOverlay: {
    position: 'absolute',
    bottom: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Theme.sizes.borderRadius.sm,
  },
  distanceText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto', // Push buttons to bottom of available space
    marginBottom: Theme.spacing.md, // Extra margin at bottom
  },
  pauseButton: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  reportButton: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
});