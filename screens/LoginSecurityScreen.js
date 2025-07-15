import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import CartHeader from '../components/CartHeader';

const items = [
  { title: 'Personal Data', icon: 'person-outline', route: 'PersonalDataScreen' },
  { title: 'Change Password', icon: 'key-outline', route: 'ChangePasswordScreen' },
  { title: 'Address List', icon: 'location-outline', route: 'AddressListScreen' },
  { title: 'Delete Account', icon: 'close-circle-outline', route: 'DeleteAccountScreen' },
];

const LoginSecurityScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Login & Security" />

      <ScrollView contentContainerStyle={styles.content}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.left}>
              <Ionicons name={item.icon} size={20} color="#47241C" />
              <Text style={styles.label}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginSecurityScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  item: {
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});
