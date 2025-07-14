import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function GrainsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Safely destructure route params
  const {
    cartQuantities = {},
    updateCart = () => {},
    cartItems = [],
  } = route.params || {};

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header
        title="Grains"
        cartQuantities={cartQuantities}
        onCartPress={() =>
          navigation.navigate('CartScreen', {
            cartItems,
            updateCart,
          })
        }
      />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Grains Page</Text>
        <Text style={styles.text}>See All Grains Products!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flexGrow: 1 },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#47241C',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
