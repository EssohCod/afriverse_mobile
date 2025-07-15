import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFavourites } from '../context/FavouriteContext.native'; // ✅ Matches export name
import { useCart } from '../context/CartContext.native';
import CartHeader from '../components/CartHeader';

const FavoriteScreen = () => {
  const { favouriteItems, removeFavourite } = useFavourites(); // ✅ Destructure correctly
  const { addToCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() =>
              addToCart({
                variantId: item.variantId,
                quantity: 1,
                size: item.size || 'Default',
              })
            }
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeFavourite(item.variantId, item.size)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Favorite Items" />

      {favouriteItems.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.text}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favouriteItems}
          keyExtractor={(item) => `${item.variantId}-${item.size}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600', color: '#47241C' },
  list: { padding: 20 },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#333', marginVertical: 6 },
  actions: { flexDirection: 'row', gap: 10 },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#47241C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 12 },
  removeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  removeText: { color: '#C41C1C', fontSize: 12 },
});
