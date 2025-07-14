import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/shopifyConfig';
import { AuthContext } from '../context/AuthContext.native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setUser, loginToShopify } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          password,
          referral,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const decoded = jwtDecode(data.token);
        await AsyncStorage.setItem('userToken', data.token);
        setUser(decoded);

        // Optional: auto login to Shopify as well
        await loginToShopify(email, password);

        const cartItems = route.params?.cartItems || [];
        navigation.navigate(cartItems.length ? 'CheckoutScreen' : 'Home');
      } else {
        Alert.alert('Signup failed', data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoIconContainer}>
        <Image source={require('../assets/logo_icon.png')} style={styles.halfLogoIcon} />
      </View>
      <Text style={styles.title}>Create an account</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="First Name"
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Referral Code"
        style={styles.input}
        value={referral}
        onChangeText={setReferral}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SignInScreen', { cartItems: route.params?.cartItems })
        }
      >
        <Text style={styles.signInText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  logoIconContainer: { alignItems: 'center', marginBottom: 20 },
  halfLogoIcon: { width: 60, height: 60, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 10 },
  button: { backgroundColor: '#47241C', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center' },
  signInText: { textAlign: 'center', marginTop: 20 },
});
