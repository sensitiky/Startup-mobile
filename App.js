import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default function App() {
  const [textColor, setTextColor] = useState("black");
  const toggleTextColor = () => {
    setTextColor((prevColor) => (prevColor === "black" ? "red" : "black"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.js to start working on your app!
      </Text>
      <View>
        <TouchableOpacity style={styles.button} onPressIn={toggleTextColor}>
          <Text style={[styles.buttonText, { color: textColor }]}>
            {"Iniciar Sesión"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="Registrarse" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    transformOrigin: "center",
  },
});
