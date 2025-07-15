import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { AuthContext } from '../context/AuthContext.native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const settings = [
    { title: 'Login & Security', icon: 'shield-checkmark-outline', route: 'LoginSecurityScreen' },
    { title: 'Referrals & Promotions', icon: 'gift-outline', route: 'ReferralScreen' },
    { title: 'Favorite', icon: 'heart-outline', route: 'FavoriteScreen' },
    { title: 'FAQs', icon: 'help-circle-outline', route: 'FAQScreen' },
    { title: 'Contact Us', icon: 'headset-outline', route: 'HelpScreen' },
    { title: 'Privacy policy', icon: 'document-text-outline', route: 'PrivacyScreen' },
    { title: 'Term of use', icon: 'document-outline', route: 'TermsScreen' },
  ];

  const handleLogoutPress = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    logout();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Text>
        </View>
        <Text style={styles.profileName}>{user?.name || 'Adesola Paul'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.settingsContainer}>
        {settings.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.settingItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.settingLeft}>
              <Ionicons name={item.icon} size={20} color="#47241C" />
              <Text style={styles.settingText}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#aaa" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
        <AntDesign name="logout" size={16} color="#C41C1C" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={handleCancel}>
              <Ionicons name="close" size={20} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Log out</Text>
            <Text style={styles.modalInfo}>Are you sure you want to Logout</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmLogout}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 45,
  },
  profileCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#47241C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#47241C',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#47241C',
  },
  settingsContainer: {
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: 30,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  settingText: {
    fontSize: 14,
    color: '#000',
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#FFECEC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#C41C1C',
    fontSize: 14,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  modalInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelBtn: {
    backgroundColor: '#47241C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47241C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  confirmText: {
    color: '#47241C',
    fontWeight: '600',
  },
});
