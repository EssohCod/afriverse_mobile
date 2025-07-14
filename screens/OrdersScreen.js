import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

export default function OrdersScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.text}>Check your recent orders here!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flexGrow: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  title: { fontSize: 24, fontWeight: '700', color: '#47241C', marginBottom: 8 },
  text: { fontSize: 16, color: '#333' },
});
