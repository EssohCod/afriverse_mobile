import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HelpIcon from '../assets/help_icon.png';

const PageContact = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HelpScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image source={HelpIcon} style={styles.icon} />
        <Text style={styles.text}>Get Help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PageContact;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 9999,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#47241C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});
