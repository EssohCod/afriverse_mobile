import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ContacScreen = () => {
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Favourite" />
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.text}>You haven't added any favourites yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default ContacScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '500', color: '#47241C' },
  list: { padding: 20 },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  size: { fontSize: 12, color: '#777', marginBottom: 4 },
  price: { fontSize: 14, color: '#333', marginBottom: 8 },
  addToCartBtn: {
    backgroundColor: '#47241C',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  removeBtn: {
    paddingVertical: 6,
  },
  removeText: { color: '#C41C1C', fontSize: 13, fontWeight: '500' },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: { fontSize: 16, fontWeight: '600', color: '#333' },
  qtyCount: { fontSize: 16, fontWeight: '500', color: '#333' },
});
