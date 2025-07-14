import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartHeader from '../components/CartHeader';
import { useCart } from '../context/CartContext.native'; // ✅ use cart context

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, updateQuantity } = useCart();

  const handleQuantityChange = (lineId, change) => {
    const item = cartItems.find(i => i.lineId === lineId);
    if (!item) return;
    const newQty = item.quantity + change;
    updateQuantity(lineId, Math.max(newQty, 0));
  };

  const handleDelete = (lineId) => {
    updateQuantity(lineId, 0);
  };

  const handleCheckout = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigation.navigate('CheckoutScreen');
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.middle}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={() => handleDelete(item.lineId)}>
          <Ionicons name="trash-outline" size={22} color="#47241C" />
        </TouchableOpacity>
        <View style={styles.qtyControl}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.lineId, -1)}>
            <Ionicons name="remove-circle-outline" size={22} color="#47241C" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.lineId, 1)}>
            <Ionicons name="add-circle-outline" size={22} color="#47241C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <CartHeader title="Your Cart" />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.lineId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        }
      />
      {cartItems.length > 0 && (
        <View style={styles.cartFooter}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 6,
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#47241C',
  },
  quantity: {
    fontSize: 12,
    color: '#333',
    marginVertical: 2,
  },
  price: {
    fontSize: 13,
    color: 'green',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  qty: {
    fontSize: 14,
    paddingHorizontal: 6,
    color: '#47241C',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#47241C',
    fontWeight: '600',
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#47241C',
  },
  checkoutButton: {
    backgroundColor: '#47241C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
