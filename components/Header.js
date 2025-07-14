import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title, cartQuantities = {}, onCartPress = () => {} }) {
  const navigation = useNavigation();

  const totalItems = Object.values(cartQuantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <Pressable
        onPress={() => navigation.canGoBack() && navigation.goBack()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && { opacity: 0.5 },
        ]}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Ionicons name="arrow-back" size={26} color="#47241C" />
      </Pressable>

      {/* Page Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Icons */}
      <View style={styles.iconGroup}>
        <Pressable style={styles.iconCircle} hitSlop={15}>
          <Ionicons name="notifications-outline" size={20} color="#47241C" />
        </Pressable>

        <View style={{ position: 'relative' }}>
          <Pressable style={styles.iconCircle} hitSlop={15} onPress={onCartPress}>
            <Image source={require('../assets/cart_icon.png')} style={styles.customCartIcon} />
          </Pressable>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: 100,
  },
  backButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#47241C',
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
});
