import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as LocalAuthentication from "expo-local-authentication";

const API_URL = process.env.API_URL;

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const textResponse = await response.text();
      console.log("Response text:", textResponse);

      try {
        const jsonResponse = JSON.parse(textResponse);
        if (response.ok) {
          navigation.navigate("Profile");
        } else {
          Alert.alert("Login Failed", jsonResponse.message);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        Alert.alert("Login Failed", "Unexpected response format.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Inicia Sesión",
      });

      if (result.success) {
        navigation.navigate("Profile");
      } else {
        Alert.alert("Error al iniciar sesión", "Por favor, intente de nuevo.");
      }
    } else {
      Alert.alert(
        "Autenticación no disponible",
        "Por favor, configure su huella dactilar."
      );
    }
  };

  useEffect(() => {
    authenticate();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(49, 189, 54)", "rgba(189, 231, 199, 1)"]}
        style={styles.background}
      />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.text}>BusFlow</Text>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />
      </Animated.View>
      <Text style={styles.welcomeText}>
        ¡Bienvenido a tu gestor de pagos y transporte urbano!
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Ingresa tu usuario o email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <View style={styles.containerButtons}>
        <Pressable
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{"Iniciar Sesión"}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{"Registrarse"}</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.welcomeText}>{"¿Olvidaste tu contraseña?"}</Text>
      </View>
      <Pressable
        style={styles.fingerprintButton}
        onPress={authenticate}
      >
        <Image
          source={require("../assets/images/fingerprint.png")}
          style={styles.image}
        />
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
  },
  logo: {
    width: 170,
    height: 170,
    position: "absolute",
    top: "-122%",
    left: "33%",
  },
  welcomeText: {
    color: "rgba(22, 25, 24, 1)",
    fontSize: 18,
    fontFamily: "BebasNeue-Regular",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
  fingerprintButton: {
    marginTop: 20,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
