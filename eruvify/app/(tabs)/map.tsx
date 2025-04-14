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
    latitude: 39.9526,
    longitude: -75.1652,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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

  // Example eruv boundary polygons
  const eruvPolygons: EruvPolygon[] = [
    {
      id: 1,
      name: "Center City Eruv",
      coordinates: [
        { latitude: 39.9626, longitude: -75.1752 },
        { latitude: 39.9626, longitude: -75.1552 },
        { latitude: 39.9426, longitude: -75.1552 },
        { latitude: 39.9426, longitude: -75.1752 },
      ]
    },
    {
      id: 2,
      name: "University City Eruv",
      coordinates: [
        { latitude: 39.9778, longitude: -75.2039 },
        { latitude: 39.9778, longitude: -75.1839 },
        { latitude: 39.9578, longitude: -75.1839 },
        { latitude: 39.9578, longitude: -75.2039 },
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
    <SafeAreaView style={styles.container}>
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
              strokeColor={Theme.colors.primary}
              strokeWidth={3}
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
            <View style={[styles.legendMarker, { backgroundColor: Theme.colors.primary }]} />
            <Text style={styles.legendText}>Eruv Boundary</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendMarker, { backgroundColor: 'red' }]} />
            <Text style={styles.legendText}>Reported Issue</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  mapContainer: {
    flex: 1,
    borderRadius: Theme.sizes.borderRadius.md,
    overflow: 'hidden',
    margin: Theme.spacing.md,
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