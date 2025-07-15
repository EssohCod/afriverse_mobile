import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartHeader from '../components/CartHeader';

const REASONS = [
  'Technical Issues',
  'Long delivery time',
  'High cost',
  'Shipping Delay',
  'Poor customer service',
  'Other',
];

export default function DeleteAccountScreen() {
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    if (keyword.trim().toLowerCase() === 'delete') {
      setShowConfirmModal(false);
      navigation.navigate('AccountDeletedScreen');
    } else {
      alert('Please type DELETE to confirm.');
    }
  };

  return (
    <View style={styles.container}>
      <CartHeader title="Delete Account" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Close Afriverse Account</Text>
        <Text style={styles.infoText}>
          We are sorry to see you go. To help improve our service, let us know why you are leaving.
        </Text>

        {REASONS.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={styles.optionRow}
            onPress={() => setSelectedReason(reason)}
          >
            <Text style={styles.optionText}>{reason}</Text>
            <View style={styles.radioCircle}>
              {selectedReason === reason && <View style={styles.selectedRb} />}
            </View>
          </TouchableOpacity>
        ))}


        {selectedReason === 'Other' && (
          <TextInput
            style={styles.textInput}
            placeholder="Input the reason"
            value={otherReason}
            onChangeText={setOtherReason}
            maxLength={255}
            multiline
          />
        )}

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirm Modal */}
      <Modal visible={showConfirmModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowConfirmModal(false)}
            >
              <Ionicons name="close" size={20} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalInfo}>
              To confirm this action is taken by you, please type DELETE in the input field below.
            </Text>

            <TextInput
              style={styles.keywordInput}
              placeholder="Enter keyword"
              value={keyword}
              onChangeText={setKeyword}
            />

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete my account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24 },
  heading: { fontSize: 20, textAlign: 'center', fontWeight: '700', marginBottom: 12 },
  infoText: { fontSize: 15, textAlign: 'center', color: '#555', marginBottom: 20, lineHeight: 22 },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 12,
  },

  textInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, minHeight: 80,
    textAlignVertical: 'top', marginBottom: 20,
  },

  confirmBtn: {
    backgroundColor: '#47241C',
    marginTop: 30,
    padding: 14, borderRadius: 38, alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20,
  },
  modalClose: { position: 'absolute', top: 10, right: 10, zIndex: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  modalInfo: { fontSize: 14, color: '#555', marginBottom: 20 },

  keywordInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
    marginBottom: 20,
  },
  deleteBtn: {
    backgroundColor: '#C41C1C', padding: 14, borderRadius: 8, alignItems: 'center',
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
