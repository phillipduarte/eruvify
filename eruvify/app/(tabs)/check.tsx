import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/useAppContext';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Theme from '@/constants/Theme';

export default function CheckScreen() {
  const { 
    isStarted,
    setIsStarted,
    isFinished,
    setIsFinished,
    distanceWalked,
    totalDistance,
    progressPercent,
    hasStartedBefore,
    setHasStartedBefore,
    isReporting,
    setIsReporting
  } = useAppContext();

  // Local state to track if we navigated away to report
  const [navigatedToReport, setNavigatedToReport] = useState(false);
  
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
      
      // Cleanup function when component loses focus
      return () => {
        // Any cleanup if needed
      };
    }, [navigatedToReport, setIsReporting])
  );
  
  // Handle reporting issue - set state and navigate
  const handleReportIssue = () => {
    setIsReporting(true);
    setNavigatedToReport(true);
    router.push('/report-issue');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Route Today</Text>
      
      {!isStarted ? (
        <View style={styles.preStartContainer}>
          <Text style={styles.assignmentTitle}>Your Assignment</Text>
          <Text style={styles.assignmentDistance}>{totalDistance} Miles</Text>
          
          <View style={styles.mapPlaceholder}>
            <Image 
              source={require('@/assets/images/map-placeholder-prestart.png')} 
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>
          
          <Button 
            title={hasStartedBefore ? "Restart" : "Start"}
            variant="primary"
            size="large"
            onPress={() => {
              setIsStarted(true);
              setHasStartedBefore(true);
            }}
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
            <Image 
              source={
                distanceWalked >= totalDistance * 0.7 
                  ? require('@/assets/images/map-placeholder-end.png')
                  : distanceWalked >= totalDistance * 0.3
                    ? require('@/assets/images/map-placeholder-mid.png')
                    : require('@/assets/images/map-placeholder-started.png')
              } 
              style={styles.mapImage}
              resizeMode="cover"
            />
            
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
              onPress={handleReportIssue} // Use our new handler instead
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