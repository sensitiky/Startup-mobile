import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import useFonts from "./hooks/fonts";

export default function App() {
  const [username, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(197, 227, 211, 1)", "rgba(189, 231, 199, 1)"]}
        style={styles.background}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.text}>BusFlow</Text>
        <Image
          source={require("./assets/public/Logo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.welcomeText}>
        ¡Bienvenido a tu gestor de pagos y transporte urbano!
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
        placeholder="Ingresa tu usuario o email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <View style={styles.containerButtons}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "rgba(172, 225, 175, 1)" : "black" },
            {
              borderColor: pressed ? "rgba(0, 0, 0, 1)" : "black",
              borderWidth: 1,
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>{"Iniciar Sesión"}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "rgba(172, 225, 175, 1)" : "black" },
            {
              borderColor: pressed ? "rgba(0, 0, 0, 1)" : "black",
              borderWidth: 1,
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>{"Registrarse"}</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.welcomeText}>{"¿Olvidaste tu contraseña?"}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "80%",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text: {
    color: "white",
    fontSize: 70,
    fontFamily: "BebasNeue-Regular",
    zIndex: 2,
  },
  logo: {
    width: 170,
    height: 170,
    zIndex: 1,
    position: "absolute",
    top: "-122%",
    left: "33%",
  },
  welcomeText: {
    color: "rgba(22, 25, 24, 1)",
    fontSize: 18,
    fontFamily: "BebasNeue-Regular",
    zIndex: 2,
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "BebasNeue-Regular",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
//Hay que agregar un router para poder navegar entre las pantallas