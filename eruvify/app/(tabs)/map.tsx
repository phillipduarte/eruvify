import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import Card from '@/components/ui/Card';

interface EruvMarker {
  id: number;
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description?: string;
}

interface EruvPolygon {
  id: number;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  
  // Philadelphia coordinates
  const initialRegion: Region = {
    latitude: 39.9550,
    longitude: -75.1930,
    latitudeDelta: 0.035, // More zoomed in
    longitudeDelta: 0.035,
  };

  // Example locations of eruv boundaries
  const eruvMarkers: EruvMarker[] = [
    { 
      id: 1, 
      latlng: { latitude: 39.9526, longitude: -75.1652 }, 
      title: "Center City Eruv",
      description: "Main downtown eruv"
    },
    { 
      id: 2, 
      latlng: { latitude: 39.9678, longitude: -75.1939 }, 
      title: "University City Eruv",
      description: "Covers the university area"
    },
    { 
      id: 3, 
      latlng: { latitude: 39.9404, longitude: -75.1892 }, 
      title: "South Philly Eruv",
      description: "Southern neighborhood eruv"
    },
  ];

  // Update these polygon coordinates for a more accurate representation
  const eruvPolygons: EruvPolygon[] = [
    {
      id: 2,
      name: "University City Eruv",
      coordinates: [
        // Much smaller University City boundary
        { latitude: 39.9620, longitude: -75.1970 }, // Northwest corner
        { latitude: 39.9620, longitude: -75.1820 }, // Northeast corner
        { latitude: 39.9560, longitude: -75.1800 }, // East side
        { latitude: 39.9490, longitude: -75.1830 }, // Southeast corner
        { latitude: 39.9480, longitude: -75.1910 }, // South point
        { latitude: 39.9500, longitude: -75.1960 }, // Southwest corner
        { latitude: 39.9560, longitude: -75.1980 }, // West side
        { latitude: 39.9620, longitude: -75.1970 }, // Back to northwest
      ]
    },
    {
      id: 3,
      name: "Penn Campus Extension",
      coordinates: [
        // Even smaller Penn Campus area
        { latitude: 39.9510, longitude: -75.1890 }, // Northwest corner
        { latitude: 39.9510, longitude: -75.1850 }, // Northeast corner
        { latitude: 39.9495, longitude: -75.1840 }, // East side
        { latitude: 39.9485, longitude: -75.1850 }, // Southeast corner
        { latitude: 39.9485, longitude: -75.1880 }, // South side
        { latitude: 39.9495, longitude: -75.1890 }, // Southwest corner
        { latitude: 39.9510, longitude: -75.1890 }, // Back to northwest
      ]
    }
  ];

  // Selected eruv state
  const [selectedEruv, setSelectedEruv] = useState<EruvMarker | null>(null);

  // Toggle map type between standard and satellite
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  const toggleMapType = () => {
    setMapType(prev => prev === 'standard' ? 'satellite' : 'standard');
  };

  // Center the map on a specific eruv
  const centerOnEruv = (eruv: EruvMarker) => {
    mapRef.current?.animateToRegion({
      latitude: eruv.latlng.latitude,
      longitude: eruv.latlng.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
    
    setSelectedEruv(eruv);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Map</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            mapType={mapType}
            showsUserLocation
            showsMyLocationButton
          >
            {eruvMarkers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                onPress={() => setSelectedEruv(marker)}
              />
            ))}
            
            {eruvPolygons.map((polygon) => (
              <Polyline
                key={polygon.id}
                coordinates={polygon.coordinates}
                strokeColor={polygon.id === 3 ? '#e91e63' : '#0056a8'}
                strokeWidth={4}
                closed
              />
            ))}
          </MapView>
          
          <View style={styles.mapControls}>
            <TouchableOpacity 
              style={styles.mapTypeButton}
              onPress={toggleMapType}
            >
              <FontAwesome 
                name={mapType === 'standard' ? 'map' : 'map-o'} 
                size={24} 
                color={Theme.colors.text} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.legend}>
            <View style={styles.legendRow}>
              <View style={[styles.legendMarker, { backgroundColor: '#0056a8' }]} />
              <Text style={styles.legendText}>Eruv Boundary</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendMarker, { backgroundColor: '#e91e63' }]} />
              <Text style={styles.legendText}>Penn Campus Extension</Text>
            </View>
          </View>
        </View>
        
        {selectedEruv && (
          <Card style={styles.eruvInfoCard} variant="elevated">
            <View style={styles.eruvInfoHeader}>
              <Text style={styles.eruvInfoTitle}>{selectedEruv.title}</Text>
              <TouchableOpacity onPress={() => setSelectedEruv(null)}>
                <FontAwesome name="times" size={20} color={Theme.colors.gray[600]} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.eruvInfoDescription}>
              {selectedEruv.description || 'No additional information available'}
            </Text>
            
            <View style={styles.eruvInfoActions}>
              <TouchableOpacity style={styles.eruvInfoButton}>
                <FontAwesome name="location-arrow" size={16} color={Theme.colors.primary} />
                <Text style={styles.eruvInfoButtonText}>Directions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.eruvInfoButton}>
                <FontAwesome name="info-circle" size={16} color={Theme.colors.primary} />
                <Text style={styles.eruvInfoButtonText}>More Info</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        
        <View style={styles.eruvList}>
          <Text style={styles.eruvListTitle}>Nearby Eruvs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eruvMarkers.map((eruv) => (
              <TouchableOpacity 
                key={eruv.id} 
                style={[
                  styles.eruvListItem,
                  selectedEruv?.id === eruv.id && styles.eruvListItemActive
                ]}
                onPress={() => centerOnEruv(eruv)}
              >
                <Text 
                  style={[
                    styles.eruvListItemText,
                    selectedEruv?.id === eruv.id && styles.eruvListItemTextActive
                  ]}
                >
                  {eruv.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mapContainer: {
    height: 400, // Fixed height for map instead of flex: 1
    borderRadius: Theme.sizes.borderRadius.md,
    overflow: 'hidden',
    margin: Theme.spacing.md,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  mapTypeButton: {
    backgroundColor: Theme.colors.white,
    padding: 8,
    borderRadius: Theme.sizes.borderRadius.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  legend: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: Theme.sizes.borderRadius.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: Theme.typography.fontSize.sm,
  },
  eruvInfoCard: {
    margin: Theme.spacing.md,
    marginTop: 0,
  },
  eruvInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  eruvInfoTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  eruvInfoDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    marginBottom: Theme.spacing.md,
  },
  eruvInfoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  eruvInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  eruvInfoButtonText: {
    marginLeft: 6,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
  },
  eruvList: {
    padding: Theme.spacing.md,
  },
  eruvListTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
  },
  eruvListItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Theme.colors.gray[200],
    marginRight: 8,
    borderRadius: Theme.sizes.borderRadius.pill,
  },
  eruvListItemActive: {
    backgroundColor: Theme.colors.primary,
  },
  eruvListItemText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text,
  },
  eruvListItemTextActive: {
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
});