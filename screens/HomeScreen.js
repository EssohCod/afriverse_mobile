import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useProducts } from '../context/ProductContext.native';
import { useCart } from '../context/CartContext.native';
import Constants from 'expo-constants';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const { products, fetchProducts } = useProducts();
  const { cartItems, addToCart, updateQuantity, removeLine, totalItems } = useCart();
  

  const sizes = [
    { label: '9kg/20lb', multiplier: 1 },
    { label: '18kg/40lb', multiplier: 1.8 },
    { label: '27kg/60lb', multiplier: 2.5 },
    { label: '36kg/80lb', multiplier: 3.2 },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const bannerIndex = useSharedValue(0);
  useEffect(() => {
    bannerIndex.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
    console.log("🔐 Shopify Domain:", Constants.expoConfig.extra.SHOPIFY_DOMAIN);
    console.log("🔐 Shopify Token:", Constants.expoConfig.extra.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  }, []);

  const banner1Style = useAnimatedStyle(() => ({ opacity: bannerIndex.value <= 0.5 ? 1 : 0 }));
  const banner2Style = useAnimatedStyle(() => ({ opacity: bannerIndex.value > 0.5 ? 1 : 0 }));

  const getPrice = (product, sizeLabel) => {
    const size = sizes.find(s => s.label === sizeLabel) || sizes[0];
    return product.price * size.multiplier;
  };

  const categories = [
    { title: 'Grains', icon: require('../assets/grains_icon.png'), screen: 'GrainsScreen' },
    { title: 'Flours', icon: require('../assets/flours_icon.png'), screen: 'FloursScreen' },
    { title: 'Spices', icon: require('../assets/spices_icon.png'), screen: 'SpicesScreen' },
    { title: 'Snacks', icon: require('../assets/snacks_icon.png'), screen: 'SnacksScreen' },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.customLogoIcon} />
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="notifications-outline" size={20} color="#47241C" />
          </TouchableOpacity>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.navigate('CartScreen')}
            >
              <Image source={require('../assets/cart_icon.png')} style={styles.customCartIcon} />
            </TouchableOpacity>
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput placeholder="Search for products" placeholderTextColor="#999" style={styles.searchInput} />
      </View>

      <View style={styles.categories}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={styles.categoryItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.categoryCircle}>
              <Image source={item.icon} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bannerWrapper}>
        <Animated.View style={[styles.bannerAbsolute, banner1Style]}>
          <LinearGradient colors={['#47241C', '#6C3023']} style={styles.bannerGradient}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Same Day Delivery</Text>
                <Text style={styles.bannerSubtitle}>Order before 12pm to get same-day delivery!</Text>
              </View>
              <Image source={require('../assets/bicycle_icon.png')} style={styles.bannerImage} />
            </View>
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.bannerAbsolute, banner2Style]}>
          <LinearGradient colors={['#000', '#333']} style={styles.bannerGradient}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Expanded Delivery Zones</Text>
                <Text style={styles.bannerSubtitle}>Now delivering to NY, PA, DC, NJ & MD.</Text>
              </View>
              <Image source={require('../assets/bicycle_icon.png')} style={styles.bannerImage} />
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      <Text style={styles.sectionTitle}>Popular Products</Text>
      <View style={styles.productList}>
        {products.map(product => {
          const quantity = cartItems.find(item => item.variantId === product.variantId)?.quantity || 0;
          const isLowStock = product.inventory <= 10;
          return (
            <View key={product.variantId} style={styles.card}>
              <TouchableOpacity
                style={styles.imageSection}
                onPress={() => navigation.navigate('ProductDetailsScreen', { product })}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </TouchableOpacity>

              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.rowBetween}>
                <Text style={styles.productRating}>4.5 ★</Text>
                <Text style={[styles.stockText, { color: isLowStock ? 'red' : 'green' }]}>
                  {product.inventory} left
                </Text>
              </View>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              {quantity > 0 ? (
                <View style={styles.cartControl}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const cartItem = cartItems.find(item => item.variantId === product.variantId);
                      if (cartItem) {
                        if (cartItem.quantity > 1) {
                          updateQuantity(cartItem.lineId, cartItem.quantity - 1);
                        } else {
                          removeLine(cartItem.lineId);
                        }
                      }
                    }}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityValue}>{quantity}</Text>

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const cartItem = cartItems.find(item => item.variantId === product.variantId);
                      if (cartItem) {
                        updateQuantity(cartItem.lineId, cartItem.quantity + 1);
                      }
                    }}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart({
                    variantId: product.variantId,
                    quantity: 1,
                    size: sizes[0].label,
                  })}
                >
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  bannerWrapper: { height: 150, marginVertical: 20, position: 'relative' },
  bannerAbsolute: { position: 'absolute', top: 0, left: 0, right: 0, height: '100%' },
  bannerGradient: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  bannerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  bannerText: { flex: 1, marginRight: 10 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  bannerSubtitle: { fontSize: 14, color: '#fff' },
  bannerImage: { width: 80, height: 80, resizeMode: 'contain' },

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  iconCircle: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 8,
  },
  customCartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  customLogoIcon: {
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },

  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#47241C',
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },


  // 🧠 SEARCH BAR STYLES
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    color: '#47241C',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#47241C',
    marginTop: 40,
    marginBottom: 16,
    textAlign: 'left',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // PRODUCTS SECTION
  card: {
    width: '45%',
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: '#f1f1f1',
    backgroundColor: '#fff',
    marginBottom: 16,
    gap: 0,
  },
  productList: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 0,
},
  imageSection: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  productRating: {
    fontSize: 10,
    color: 'green',
    marginVertical: 4,
  },
  productQuantity: {
    fontSize: 12,
    fontWeight: '500',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
  },
  sizeButton: {
    width: '48%',
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginTop: 6,
  },
  activeSize: {
    backgroundColor: '#47241C',
  },
  activeSizeText: {
    color: '#fff',
  },
  sizeText: {
    fontSize: 12,
    color: '#333',
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#47241C',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartControl: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    height: 40,
  },
  quantityButton: {
    backgroundColor: '#47241C',
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#47241C',
  },
    rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
  marginVertical: 4,
},
stockText: {
  fontSize: 12,
},
productPrice: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#47241C',
  marginTop: 4,
},
productRating: {
  fontSize: 12,
  fontWeight: '600',
  color: '#333',
},
imageSection: {
  backgroundColor: '#f9f9f9',
  alignItems: 'center',
  justifyContent: 'center',
  height: 120,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
},
productImage: {
  width: '80%',
  height: '80%',
  resizeMode: 'contain',
},
addToCartButton: {
  marginTop: 10,
  backgroundColor: '#47241C',
  paddingVertical: 8,
  borderRadius: 20,
  alignItems: 'center',
},
addToCartText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},


  // Ads Banner
  bannerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    // marginTop: '30',
  },
  bannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  bannerImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  bannerWrapper: {
    height: 120,
    marginVertical: 40,
    marginBottom: -20,
    position: 'relative',
  },
  bannerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },


});