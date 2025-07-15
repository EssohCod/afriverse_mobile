import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CartHeader from '../components/CartHeader';

const PrivacyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Privacy Policy" />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          We respect your privacy. All user data is securely stored and never shared with third parties without your consent.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
