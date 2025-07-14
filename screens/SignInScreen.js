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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/shopifyConfig';
import { AuthContext } from '../context/AuthContext.native';

export default function SignInScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { loginToShopify, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinueAsGuest = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.navigate('CheckoutScreen', {
      cartItems: route.params?.cartItems || [],
    });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen', {
      cartItems: route.params?.cartItems || [],
    });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgetPasswordScreen'); // ✅ Navigate to the forgot password screen
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (response.ok && data.token && data.user) {
        const decoded = jwtDecode(data.token);
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setUser(decoded);

        const cartItems = route.params?.cartItems || [];
        navigation.navigate(cartItems.length ? 'CheckoutScreen' : 'Home');
      } else {
        Alert.alert('Login failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: null })}
    >
      <View style={styles.logoIconContainer}>
        <Image source={require('../assets/logo_icon.png')} style={styles.halfLogoIcon} />
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* ✅ Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={handleContinueAsGuest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  halfLogoIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#47241C',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotText: {
    color: '#47241C',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#47241C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  guestButton: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#47241C',
  },
  guestText: {
    textAlign: 'center',
    color: '#47241C',
    fontWeight: '600',
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#47241C',
    fontWeight: '600',
  },
});
