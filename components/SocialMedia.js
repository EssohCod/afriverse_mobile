import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const sampleImages = [
  {
    id: 1,
    uri: require('../assets/social1.jpg'),
    url: 'https://www.instagram.com/p/POST1/',
  },
  {
    id: 2,
    uri: require('../assets/social2.jpg'),
    url: 'https://www.instagram.com/p/POST2/',
  },
  {
    id: 3,
    uri: require('../assets/social3.jpg'),
    url: 'https://www.instagram.com/p/POST3/',
  },
  {
    id: 4,
    uri: require('../assets/social4.jpg'),
    url: 'https://www.instagram.com/p/POST4/',
  },
];

const SocialMedia = () => {
  const scrollRef = useRef();

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL: ', err)
    );
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 150, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.left}>
          <Ionicons name="logo-instagram" size={20} color="#47241C" />
          <Text style={styles.title}>Afriverse Foods</Text>
        </View>
        <TouchableOpacity onPress={handleScrollRight}>
          <Feather name="arrow-right" size={20} color="#47241C" />
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bottomSection}
      >
        {sampleImages.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.url)}>
            <Image source={item.uri} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SocialMedia;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 50,
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#47241C',
  },
  bottomSection: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
});
