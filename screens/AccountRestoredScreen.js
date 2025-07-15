import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CartHeader from '../components/CartHeader';
import { useNavigation } from '@react-navigation/native';

export default function AccountRestoredScreen() {
  const navigation = useNavigation();

    const handleContinue = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
    };

  return (
    <View style={styles.container}>
      <CartHeader title="Account Restored" />

      <View style={styles.content}>
        <Text style={styles.text}>Thanks for staying with us!</Text>

        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  continueBtn: {
    backgroundColor: '#47241C',
    paddingVertical: 16,
    borderRadius: 38,
    width: '100%',
    alignItems: 'center',
  },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
