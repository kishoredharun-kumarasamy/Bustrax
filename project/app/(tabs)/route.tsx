import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Users, Navigation, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

export default function RouteScreen() {
  const [selectedTrip, setSelectedTrip] = useState(0);

  const routeInfo = {
    name: 'Route A - Downtown Express',
    totalDistance: '24.5 km',
    estimatedTime: '45 min',
    totalStops: 12,
  };

  const trips = [
    { id: 1, time: '06:00 AM', status: 'completed' },
    { id: 2, time: '08:00 AM', status: 'completed' },
    { id: 3, time: '10:00 AM', status: 'completed' },
    { id: 4, time: '12:00 PM', status: 'active' },
    { id: 5, time: '02:00 PM', status: 'upcoming' },
    { id: 6, time: '04:00 PM', status: 'upcoming' },
  ];

  const stops = [
    { name: 'Central Terminal', time: '12:00 PM', passengers: 0, status: 'completed' },
    { name: 'Main Street Station', time: '12:05 PM', passengers: 8, status: 'completed' },
    { name: 'University Campus', time: '12:12 PM', passengers: 15, status: 'completed' },
    { name: 'Shopping Mall', time: '12:18 PM', passengers: 12, status: 'current' },
    { name: 'Business District', time: '12:25 PM', passengers: 0, status: 'upcoming' },
    { name: 'Hospital', time: '12:30 PM', passengers: 0, status: 'upcoming' },
    { name: 'Residential Area A', time: '12:35 PM', passengers: 0, status: 'upcoming' },
    { name: 'Residential Area B', time: '12:40 PM', passengers: 0, status: 'upcoming' },
    { name: 'Airport Terminal', time: '12:45 PM', passengers: 0, status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'current': return '#f59e0b';
      case 'active': return '#0ea5e9';
      case 'upcoming': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'current': return MapPin;
      default: return Circle;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Route Details</Text>
          <Text style={styles.subtitle}>Track your assigned route and stops</Text>
        </View>

        {/* Route Info Card */}
        <View style={styles.routeCard}>
          <Text style={styles.routeName}>{routeInfo.name}</Text>
          <View style={styles.routeStats}>
            <View style={styles.statItem}>
              <Navigation size={16} color="#0ea5e9" />
              <Text style={styles.statText}>{routeInfo.totalDistance}</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#0ea5e9" />
              <Text style={styles.statText}>{routeInfo.estimatedTime}</Text>
            </View>
            <View style={styles.statItem}>
              <MapPin size={16} color="#0ea5e9" />
              <Text style={styles.statText}>{routeInfo.totalStops} stops</Text>
            </View>
          </View>
        </View>

        {/* Trip Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsContainer}>
            {trips.map((trip, index) => (
              <TouchableOpacity
                key={trip.id}
                style={[
                  styles.tripCard,
                  selectedTrip === index && styles.tripCardSelected,
                  { backgroundColor: getStatusColor(trip.status) + '20' }
                ]}
                onPress={() => setSelectedTrip(index)}
              >
                <Text style={[styles.tripTime, { color: getStatusColor(trip.status) }]}>
                  {trip.time}
                </Text>
                <Text style={[styles.tripStatus, { color: getStatusColor(trip.status) }]}>
                  Trip {trip.id}
                </Text>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(trip.status) }]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Trip Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trip {trips[selectedTrip].id} - {trips[selectedTrip].time}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trips[selectedTrip].status) + '20' }]}>
              <Text style={[styles.statusBadgeText, { color: getStatusColor(trips[selectedTrip].status) }]}>
                {trips[selectedTrip].status.charAt(0).toUpperCase() + trips[selectedTrip].status.slice(1)}
              </Text>
            </View>
          </View>

          {/* Stops List */}
          <View style={styles.stopsContainer}>
            {stops.map((stop, index) => {
              const StatusIcon = getStatusIcon(stop.status);
              return (
                <View key={index} style={styles.stopItem}>
                  <View style={styles.stopIconContainer}>
                    <StatusIcon 
                      size={20} 
                      color={getStatusColor(stop.status)}
                      fill={stop.status === 'completed' ? getStatusColor(stop.status) : 'none'}
                    />
                    {index < stops.length - 1 && (
                      <View style={[
                        styles.connectionLine,
                        { backgroundColor: stop.status === 'completed' ? '#10b981' : '#e2e8f0' }
                      ]} />
                    )}
                  </View>
                  
                  <View style={styles.stopContent}>
                    <View style={styles.stopHeader}>
                      <Text style={[
                        styles.stopName,
                        stop.status === 'current' && styles.currentStopName
                      ]}>
                        {stop.name}
                      </Text>
                      <Text style={[
                        styles.stopTime,
                        stop.status === 'current' && styles.currentStopTime
                      ]}>
                        {stop.time}
                      </Text>
                    </View>
                    
                    {stop.passengers > 0 && (
                      <View style={styles.passengersInfo}>
                        <Users size={14} color="#64748b" />
                        <Text style={styles.passengersText}>
                          {stop.passengers} passengers boarded
                        </Text>
                      </View>
                    )}
                    
                    {stop.status === 'current' && (
                      <View style={styles.currentStopIndicator}>
                        <Text style={styles.currentStopText}>Current Location</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Action Buttons */}
        {trips[selectedTrip].status === 'active' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Update Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Report Delay</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  routeCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  routeName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 16,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  tripsContainer: {
    marginBottom: 8,
  },
  tripCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    position: 'relative',
  },
  tripCardSelected: {
    borderWidth: 2,
    borderColor: '#0ea5e9',
  },
  tripTime: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  tripStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  stopsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stopItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stopIconContainer: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  connectionLine: {
    width: 2,
    height: 40,
    marginTop: 8,
  },
  stopContent: {
    flex: 1,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stopName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
  },
  currentStopName: {
    color: '#f59e0b',
  },
  stopTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  currentStopTime: {
    color: '#f59e0b',
  },
  passengersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  passengersText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 4,
  },
  currentStopIndicator: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  currentStopText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
});