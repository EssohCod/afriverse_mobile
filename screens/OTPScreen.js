import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from "axios";

const OTPScreen = ({ navigation }) => {
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const email = localStorage.getItem("resetEmail");

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleSubmit = async () => {
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) return Alert.alert("Error", "Enter a 6-digit OTP.");

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp: joinedOtp });
      navigation.navigate("NewPasswordScreen");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>The OTP code has been sent to {email}</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirm</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 14, textAlign: "center", color: "gray", marginBottom: 30 },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
  },
  button: { backgroundColor: "#47241c", padding: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default OTPScreen;
