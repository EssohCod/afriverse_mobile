import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const NewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const email = localStorage.getItem("resetEmail");

  const validate = () => {
    if (password !== confirm) return "Passwords do not match";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return Alert.alert("Validation Error", err);
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/auth/reset-password`, { email, password });
      localStorage.removeItem("resetEmail");
      navigation.navigate("SuccessScreen");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.msg || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm New Password"
        value={confirm}
        onChangeText={setConfirm}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 20 },
  button: { backgroundColor: "#47241c", padding: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default NewPasswordScreen;
