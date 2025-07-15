import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CartHeader from '../components/CartHeader';

const TermsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Terms of Use" />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          By using this app, you agree to our terms and conditions. Please read them carefully.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TermsScreen;

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
