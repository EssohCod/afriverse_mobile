// components/AppLayout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContact from './PageContact.native';

const AppLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <PageContact />
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
