import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as LocalAuthentication from "expo-local-authentication";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Profile");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos.");
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
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(49, 189, 54)", "rgba(189, 231, 199, 1)"]}
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
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgba(172, 225, 175, 1)" : "black",
              borderColor: "black",
              borderWidth: 1,
            },
            styles.button,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{"Iniciar Sesión"}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgba(172, 225, 175, 1)" : "black",
              borderColor: "black",
              borderWidth: 1,
            },
            styles.button,
          ]}
          onPress={authenticate}
        >
          <Text style={styles.buttonText}>{"Huella Dactilar"}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgba(172, 225, 175, 1)" : "black",
              borderColor: "black",
              borderWidth: 1,
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("Profile")}
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
