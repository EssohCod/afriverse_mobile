import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleReset = async () => {
    if (!email) return Alert.alert("Error", "Email is required.");
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/request-reset`, { email });
      localStorage.setItem("resetEmail", email);
      navigation.navigate("OTPScreen");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo_icon.png")} style={styles.logo} />
      <Text style={styles.title}>Forgot your Password?</Text>
      <Text style={styles.subtitle}>Please provide your email below, to be able to reset for you.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
        <Text style={styles.loginLink}>I remember my password? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#fff" },
  logo: { width: 60, height: 60, alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 12, textAlign: "center", color: "gray", marginBottom: 40 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 20 },
  button: { backgroundColor: "#47241c", padding: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: 500 },
  loginLink: { textAlign: "center", color: "#47241c", marginTop: 15 },
});

export default ForgetPasswordScreen;
