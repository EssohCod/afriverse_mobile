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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
    paddingTop: 40,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    height: 80,
  },
  backButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#47241C',
    textAlign: 'center',
  },
});
