import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import { useCart } from '../context/CartContext.native';
import { AuthContext } from '../context/AuthContext.native';
import SocialMedia from '../components/SocialMedia';
import { useFavourites } from '../context/FavouriteContext.native';

const sizeMultipliers = {
  '9kg/20lb': 1,
  '18kg/40lb': 1.5,
  '27kg/60lb': 2,
  '36kg/80lb': 2.5,
};
const sizeOptions = Object.keys(sizeMultipliers);

export default function ProductDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  const [selectedSize, setSelectedSize] = useState('9kg/20lb');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  const basePrice = product.price || 0;
  const totalPrice = basePrice * sizeMultipliers[selectedSize] * quantity;

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      variantId: product.variantId,
      quantity,
      size: selectedSize,
    });
  };

  const handleBuyNow = () => {
    if (user) {
      navigation.navigate('CheckoutScreen');
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  // ✅ Use helper, don’t keep separate state
  const fav = isFavourite(product.variantId, selectedSize);

  const toggleFav = () => {
    if (fav) {
      removeFavourite(product.variantId, selectedSize);
    } else {
      addFavourite({
        ...product,
        variantId: product.variantId,
        size: selectedSize,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header style={{ marginBottom: 50 }} title="Product Details" />

      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.favIcon} onPress={toggleFav}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={24}
              color={fav ? 'red' : '#333'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.stock}>{product.inventory} items left</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>5.0</Text>
          {Array(5)
            .fill()
            .map((_, i) => (
              <Ionicons key={i} name="star" size={16} color="green" />
            ))}
        </View>

        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Choose Size</Text>
        <View style={styles.sizeOptions}>
          {sizeOptions.map(size => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.sizeOption,
                selectedSize === size && styles.sizeActive,
              ]}
            >
              <Text>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={decreaseQty} style={styles.qtyButton}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQty} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {product.description || 'No description available.'}
        </Text>
        <SocialMedia />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  imageWrapper: { position: 'relative' },
  productImage: { width: '100%', height: 250, resizeMode: 'contain' },
  favIcon: { position: 'absolute', top: 10, right: 10 },
  productName: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  stock: { color: '#888', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ratingText: { marginRight: 5 },
  price: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  sizeOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
  },
  sizeActive: { borderColor: '#47241C', backgroundColor: '#eee' },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  qtyText: { fontSize: 18 },
  qtyValue: { fontSize: 18, marginHorizontal: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cartButton: { flex: 1, backgroundColor: '#eee', padding: 12, borderRadius: 5, alignItems: 'center', marginRight: 10 },
  cartText: { fontWeight: 'bold' },
  buyButton: { flex: 1, backgroundColor: '#000', padding: 12, borderRadius: 5, alignItems: 'center' },
  buyText: { color: '#fff', fontWeight: 'bold' },
  description: { fontSize: 14, color: '#444', marginVertical: 10 },
});
