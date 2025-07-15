import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext.native';
import CartHeader from '../components/CartHeader';

const PersonalDataScreen = () => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    // 🛠️ Add logic to save updated profile to backend
    alert("Profile saved (Not implemented)");
  };

  return (
    <View style={styles.container}>
      <CartHeader title="Personal Data" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile details</Text>

        <View style={styles.nameRow}>
          <TextInput
            placeholder="First Name"
            style={styles.inputHalf}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.inputHalf}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PersonalDataScreen;

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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#47241C',
  },
  nameRow: {
    // flexDirection: 'row',
    // gap: 10,
    // width: 100,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: '#47241C',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
