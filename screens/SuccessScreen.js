import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={80} color="#47241c" />
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>Your password has successfully reset</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignInScreen")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 20 },
  subtitle: { fontSize: 16, color: "gray", marginVertical: 10 },
  button: { marginTop: 30, backgroundColor: "#47241c", padding: 12, textAlign: 'center', borderRadius: 30, width: 100, },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16, textAlign: 'center', },
});

export default SuccessScreen;
