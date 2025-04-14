import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/useAppContext';
import Button from '@/components/ui/Button';
import Theme from '@/constants/Theme';

export default function RouteChangeScreen() {
  const { handleRouteChangeConfirm } = useAppContext();
  const [reason, setReason] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    handleRouteChangeConfirm();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Request Route Change</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="times" size={24} color={Theme.colors.gray[700]} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.label}>
          Please let us know why you'd like to change your assigned route:
        </Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="Enter reason here..."
          value={reason}
          onChangeText={setReason}
          multiline
          textAlignVertical="top"
        />
        
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityLabel}>When are you available?</Text>
          
          <View style={styles.checkboxRow}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => {}} // Toggle checkbox state
            >
              <FontAwesome name="check-square" size={20} color={Theme.colors.primary} />
              <Text style={styles.checkboxLabel}>Weekdays</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => {}} // Toggle checkbox state
            >
              <FontAwesome name="square-o" size={20} color={Theme.colors.gray[600]} />
              <Text style={styles.checkboxLabel}>Weekends</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.checkboxRow}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => {}} // Toggle checkbox state
            >
              <FontAwesome name="check-square" size={20} color={Theme.colors.primary} />
              <Text style={styles.checkboxLabel}>Morning</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => {}} // Toggle checkbox state
            >
              <FontAwesome name="square-o" size={20} color={Theme.colors.gray[600]} />
              <Text style={styles.checkboxLabel}>Afternoon</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => {}} // Toggle checkbox state
            >
              <FontAwesome name="square-o" size={20} color={Theme.colors.gray[600]} />
              <Text style={styles.checkboxLabel}>Evening</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Button
          title="Submit Request"
          onPress={handleSubmit}
          disabled={!reason.trim()}
          fullWidth
          style={styles.submitButton}
        />
        
        <Text style={styles.infoText}>
          We'll try to accommodate your request based on availability.
        </Text>
      </View>
      
      {/* Confirmation Dialog */}
      <Modal
        transparent
        visible={isConfirmOpen}
        animationType="fade"
        onRequestClose={() => setIsConfirmOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmDialog}>
            <Text style={styles.confirmTitle}>Confirm Request</Text>
            <Text style={styles.confirmText}>
              Are you sure you want to request a route change? Your current assignment will remain active until a new one is assigned.
            </Text>
            
            <View style={styles.confirmButtons}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setIsConfirmOpen(false)}
                style={styles.confirmButton}
              />
              <Button
                title="Confirm"
                onPress={handleConfirm}
                style={styles.confirmButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  closeButton: {
    padding: Theme.spacing.xs,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  label: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.md,
    color: Theme.colors.text,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    height: 120,
    marginBottom: Theme.spacing.lg,
    fontSize: Theme.typography.fontSize.md,
  },
  availabilityContainer: {
    marginBottom: Theme.spacing.lg,
  },
  availabilityLabel: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '500',
    marginBottom: Theme.spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  checkboxLabel: {
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
  },
  submitButton: {
    marginBottom: Theme.spacing.lg,
  },
  infoText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.gray[600],
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmDialog: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  confirmTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
  },
  confirmText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
});