import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CartHeader from '../components/CartHeader';
import { useNavigation } from '@react-navigation/native';

export default function AccountDeletedScreen() {
  const navigation = useNavigation();

  const handleUndo = () => {
    navigation.navigate('AccountRestoredScreen');
  };

  return (
    <View style={styles.container}>
      <CartHeader title="Account Deleted" />

      <View style={styles.content}>
        <Text style={styles.text}>
          We are sad to see you go. We will keep improving our service to win you over next time.
        </Text>

        <TouchableOpacity style={styles.undoBtn} onPress={handleUndo}>
          <Text style={styles.undoText}>Undo Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  undoBtn: {
    backgroundColor: '#47241C',
    paddingVertical: 16,
    borderRadius: 38,
    width: '100%',
    alignItems: 'center',
  },
  undoText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
