import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CartHeader from '../components/CartHeader';

const AddressListScreen = () => {
  return (
    <View style={styles.container}>
      <CartHeader title="Address List" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Saved Addresses</Text>

        <View style={styles.card}>
          <Text style={styles.label}>John Doe</Text>
          <Text>123 Main St, Lagos, NG</Text>
          <Text>+234 801 234 5678</Text>
          <TouchableOpacity style={styles.deleteBtn}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#47241C',
  },
  card: {
    backgroundColor: '#F6F6F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#C41C1C',
    fontWeight: '500',
  },
  addBtn: {
    backgroundColor: '#47241C',
    padding: 12,
    borderRadius: 38,
    marginTop: 20,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
