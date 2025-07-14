import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartHeader from '../components/CartHeader';
import * as Linking from 'expo-linking';
import { CREATE_CART } from '../graphql/mutation';
import { shopifyQuery } from '../api/shopifyClient';
import { useCart } from '../context/CartContext.native';

export default function CheckoutScreen() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.image }} style={styles.orderImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productQty}>Qty: {item.quantity}</Text>
        <Text style={styles.productPrice}>${item.price.toLocaleString()} USD</Text>
      </View>
    </View>
  );

  const handleContinueToCheckout = async () => {
    try {
      const lines = cartItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));

      const input = { lines };
      const response = await shopifyQuery(CREATE_CART, { input });

      const cart = response.cartCreate?.cart;
      const checkoutUrl = cart?.checkoutUrl;

      if (checkoutUrl) {
        Linking.openURL(checkoutUrl);
      } else {
        alert('Could not create checkout. Please try again.');
        console.error('Cart creation failed:', response.cartCreate?.userErrors);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <View style={styles.container}>
      <CartHeader title="Checkout" />

      <View style={styles.progressRow}>
        <Ionicons name="cart-outline" size={20} color="#47241C" />
        <Text style={styles.stepText}>Your Order</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.lineId.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Your cart is empty.
          </Text>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${total.toLocaleString()}</Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinueToCheckout}>
            <Text style={styles.continueButtonText}>Continue to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  stepText: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    color: '#47241C',
    fontSize: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productName: {
    fontWeight: 'bold',
  },
  productQty: {
    color: '#555',
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#47241C',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#47241C',
    padding: 12,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
