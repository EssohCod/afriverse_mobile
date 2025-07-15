import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartHeader from '../components/CartHeader';

const faqData = [
  {
    question: 'How Long will My Order take?',
    answer:
      'Orders typically arrive within 2–5 business days depending on your location.',
  },
  {
    question: 'I Can’t Find My Location',
    answer:
      'Make sure your GPS is enabled and the app has location permissions.',
  },
  {
    question: 'Are Delivery Fees Fixed?',
    answer:
      'Delivery fees vary depending on distance and time of delivery.',
  },
  {
    question: 'I Forgot My Email Address',
    answer:
      'Please contact support to retrieve or update your registered email address.',
  },
];

const FAQScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="FAQs" />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => toggleAccordion(index)}
              style={styles.questionRow}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#47241C"
              />
            </TouchableOpacity>

            {activeIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  body: {
    fontFamily: 'Outfit-Regular',
  },
  content: {
    padding: 20,
  },
  faqItem: {
    marginBottom: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
