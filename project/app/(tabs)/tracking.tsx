import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Users, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Navigation, Pause, Play } from 'lucide-react-native';

export default function TrackingScreen() {
  const [currentStatus, setCurrentStatus] = useState('on-route');
  const [passengerCount, setPassengerCount] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [isBreakActive, setIsBreakActive] = useState(false);

  const statusOptions = [
    { id: 'on-route', label: 'On Route', color: '#10b981', icon: Navigation },
    { id: 'at-stop', label: 'At Stop', color: '#f59e0b', icon: MapPin },
    { id: 'delayed', label: 'Delayed', color: '#ef4444', icon: AlertTriangle },
    { id: 'break', label: 'On Break', color: '#6366f1', icon: Pause },
  ];

  const currentLocation = {
    stop: 'Shopping Mall',
    coordinates: '40.7128° N, 74.0060° W',
    lastUpdate: '2 minutes ago',
  };

  const tripProgress = {
    completed: 4,
    total: 9,
    percentage: 44,
  };

  const handleStatusUpdate = (statusId: string) => {
    setCurrentStatus(statusId);
    Alert.alert('Status Updated', `Your status has been updated to ${statusOptions.find(s => s.id === statusId)?.label}`);
  };

  const handleLocationUpdate = () => {
    Alert.alert('Location Updated', 'Your current location has been updated successfully.');
  };

  const handlePassengerUpdate = () => {
    if (!passengerCount.trim()) {
      Alert.alert('Error', 'Please enter the passenger count');
      return;
    }
    Alert.alert('Passenger Count Updated', `Passenger count updated to ${passengerCount}`);
    setPassengerCount('');
  };

  const handleDelayReport = () => {
    if (!delayReason.trim()) {
      Alert.alert('Error', 'Please enter the reason for delay');
      return;
    }
    Alert.alert('Delay Reported', 'Delay has been reported to dispatch');
    setDelayReason('');
  };

  const toggleBreak = () => {
    setIsBreakActive(!isBreakActive);
    const action = !isBreakActive ? 'started' : 'ended';
    Alert.alert('Break Status', `Break has been ${action}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Live Tracking</Text>
          <Text style={styles.subtitle}>Update your location and trip status</Text>
        </View>

        {/* Current Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIcon}>
              <MapPin size={24} color="#ffffff" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>Current Location</Text>
              <Text style={styles.locationName}>{currentLocation.stop}</Text>
              <Text style={styles.coordinates}>{currentLocation.coordinates}</Text>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={handleLocationUpdate}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lastUpdate}>Last updated: {currentLocation.lastUpdate}</Text>
        </View>

        {/* Trip Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Trip Progress</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Stop {tripProgress.completed} of {tripProgress.total}
            </Text>
            <Text style={styles.progressPercentage}>{tripProgress.percentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${tripProgress.percentage}%` }]} />
          </View>
        </View>

        {/* Status Update */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Update Status</Text>
          <View style={styles.statusGrid}>
            {statusOptions.map((status) => {
              const StatusIcon = status.icon;
              const isSelected = currentStatus === status.id;
              return (
                <TouchableOpacity
                  key={status.id}
                  style={[
                    styles.statusCard,
                    isSelected && { backgroundColor: status.color + '20', borderColor: status.color }
                  ]}
                  onPress={() => handleStatusUpdate(status.id)}
                >
                  <StatusIcon 
                    size={24} 
                    color={isSelected ? status.color : '#64748b'} 
                  />
                  <Text style={[
                    styles.statusLabel,
                    isSelected && { color: status.color }
                  ]}>
                    {status.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <CheckCircle size={16} color={status.color} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Passenger Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Count</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputRow}>
              <Users size={20} color="#64748b" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter current passenger count"
                placeholderTextColor="#94a3b8"
                value={passengerCount}
                onChangeText={setPassengerCount}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.submitButton} onPress={handlePassengerUpdate}>
                <Text style={styles.submitButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Delay Reporting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Delay</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputColumn}>
              <View style={styles.inputRow}>
                <AlertTriangle size={20} color="#64748b" />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Reason for delay (traffic, breakdown, etc.)"
                  placeholderTextColor="#94a3b8"
                  value={delayReason}
                  onChangeText={setDelayReason}
                  multiline
                />
              </View>
              <TouchableOpacity style={styles.reportButton} onPress={handleDelayReport}>
                <Text style={styles.reportButtonText}>Report Delay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Break Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Break Management</Text>
          <View style={styles.breakCard}>
            <View style={styles.breakInfo}>
              <View style={[styles.breakIcon, { backgroundColor: isBreakActive ? '#ef4444' : '#10b981' }]}>
                {isBreakActive ? (
                  <Pause size={24} color="#ffffff" />
                ) : (
                  <Play size={24} color="#ffffff" />
                )}
              </View>
              <View style={styles.breakText}>
                <Text style={styles.breakTitle}>
                  {isBreakActive ? 'Break Active' : 'Ready for Service'}
                </Text>
                <Text style={styles.breakSubtitle}>
                  {isBreakActive ? 'Passengers cannot board' : 'Available for passengers'}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.breakButton, { backgroundColor: isBreakActive ? '#ef4444' : '#10b981' }]}
              onPress={toggleBreak}
            >
              <Text style={styles.breakButtonText}>
                {isBreakActive ? 'End Break' : 'Start Break'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Emergency Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Call Dispatch</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  locationCard: {
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
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 2,
  },
  locationName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  coordinates: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  updateButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  updateButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  lastUpdate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  progressCard: {
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
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  progressPercentage: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f97316',
    borderRadius: 4,
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
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  inputCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputColumn: {
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginLeft: 12,
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  reportButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  breakCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  breakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  breakText: {
    flex: 1,
  },
  breakTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  breakSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  breakButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  breakButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
});