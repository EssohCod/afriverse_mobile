import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Ionicons,
  FontAwesome5,
  Feather,
  Entypo,
} from '@expo/vector-icons';
import CartHeader from '../components/CartHeader';

const contactOptions = [
  {
    label: 'Send us an email',
    icon: <Ionicons name="mail-outline" size={20} color="#47241C" />,
    action: () => Linking.openURL('mailto:info@afriversefoods.com'),
  },
  {
    label: 'Reach us on Whatsapp',
    icon: <FontAwesome5 name="whatsapp" size={20} color="#25D366" />,
    action: () => Linking.openURL('https://wa.me/2400000000'),
  },
  {
    label: 'Contact us on Facebook',
    icon: <Feather name="facebook" size={20} color="#1877F2" />,
    action: () => Linking.openURL('https://facebook.com/afriversefoods'),
  },
  {
    label: 'Contact us on Instagram',
    icon: <Feather name="instagram" size={20} color="#C13584" />,
    action: () => Linking.openURL('https://instagram.com/afriversefoods'),
  },
  {
    label: 'Contact us on Twitter',
    icon: <Feather name="twitter" size={20} color="#1DA1F2" />,
    action: () => Linking.openURL('https://twitter.com/afriversefoods'),
  },
  {
    label: '(240) 000-0000',
    icon: <Entypo name="phone" size={20} color="#47241C" />,
    action: () => Linking.openURL('tel:2400000000'),
  },
];

const HelpScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Contact Us" />
      <ScrollView contentContainerStyle={styles.content}>
        {contactOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactRow}
            onPress={option.action}
          >
            <View style={styles.iconLabel}>
              {option.icon}
              <Text style={styles.label}>{option.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#aaa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});
