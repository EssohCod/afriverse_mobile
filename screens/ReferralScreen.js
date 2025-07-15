import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import CartHeader from '../components/CartHeader';
import { Ionicons } from '@expo/vector-icons';
import Clipboard from '@react-native-clipboard/clipboard';

// import { useClipboard } from '@react-native-clipboard/clipboard';

export default function ReferralScreen() {
  const [activeTab, setActiveTab] = useState('Promotions');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // If you're using expo-clipboard:
    // Clipboard.setStringAsync('https://afriverse.com/ref/abc123');
    Clipboard.setString('https://afriverse.com/ref/abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CartHeader title="Referrals & Promotions" />

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Promotions' && styles.activeTab]}
          onPress={() => setActiveTab('Promotions')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Promotions' && styles.activeTabText,
            ]}
          >
            Promotions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Referral' && styles.activeTab]}
          onPress={() => setActiveTab('Referral')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Referral' && styles.activeTabText,
            ]}
          >
            Referral
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Promotions' ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
          {[10, 20, 30, 40, 50, 50].map((amount, idx) => (
            <View key={idx} style={styles.couponCard}>
              <View>
                <Text style={styles.couponTitle}>General Coupon</Text>
                <Text style={styles.couponSubtitle}>Purchase over ${amount * 5}</Text>
                <Text style={styles.validText}>Valid until 12/31/25</Text>
              </View>
              <View style={styles.couponRight}>
                <Text style={styles.couponAmount}>${amount}</Text>
                <TouchableOpacity style={styles.useBtn}>
                  <Text style={styles.useText}>Use</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.referralSection}>
            <Text style={styles.label}>Number of referrals</Text>
            <Text style={styles.number}>5</Text>

            <View style={styles.pointsBox}>
              <Text style={styles.pointsLabel}>Total Points: 100</Text>
              <Text style={styles.shareLabel}>Share this URL to give friends 10 points each!</Text>
              <View style={styles.urlRow}>
                <Text style={styles.urlText}>https://afriverse.com/ref/abc123</Text>
                <TouchableOpacity onPress={handleCopy}>
                  <Ionicons name="copy-outline" size={20} color="#47241C" />
                </TouchableOpacity>
              </View>
              {copied && <Text style={styles.copiedText}>Copied!</Text>}
            </View>

            <View style={styles.promoCodeSection}>
              <Text style={styles.promoLabel}>Use Referral Points</Text>
              <Text style={styles.promoSub}>Do you have a promo code? Enter the code below.</Text>
              <View style={styles.promoRow}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Add a Promo Code"
                  value={referralCode}
                  onChangeText={setReferralCode}
                />
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 50,
    backgroundColor: '#F2F2F2',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#47241C',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  scrollContainer: { flex: 1, marginTop: 20, paddingHorizontal: 20 },

  couponCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
  },
  couponTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  couponSubtitle: { fontSize: 14, color: '#555', marginBottom: 2 },
  validText: { fontSize: 12, color: '#888' },

  couponRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  couponAmount: {
    backgroundColor: '#47241C',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  useBtn: {
    marginTop: 8,
    backgroundColor: '#47241C',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  useText: { color: '#fff', fontSize: 14 },

  referralSection: { marginBottom: 40 },
  label: { fontSize: 14, color: '#555', marginBottom: 4 },
  number: { fontSize: 16, fontWeight: '600', marginBottom: 20 },

  pointsBox: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  pointsLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  shareLabel: { fontSize: 14, color: '#555', marginBottom: 12 },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  urlText: { fontSize: 12, color: '#333' },
  copiedText: { fontSize: 12, color: 'green', marginTop: 8 },

  promoCodeSection: {},
  promoLabel: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  promoSub: { fontSize: 14, color: '#555', marginBottom: 12 },
  promoRow: { flexDirection: 'row', alignItems: 'center' },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  applyBtn: {
    backgroundColor: '#47241C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
