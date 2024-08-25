import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    Easing,
  } from "react-native";
  import React, { useRef } from "react";
  import NavigationBottomBar from "../components/navigationbottom";
  
  export default function Settings() {
    const scaleValue1 = useRef(new Animated.Value(1)).current;
    const scaleValue2 = useRef(new Animated.Value(1)).current;
    const scaleValue3 = useRef(new Animated.Value(1)).current;
  
    const animateScale = (scaleValue, toValue) => {
      Animated.timing(scaleValue, {
        toValue,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Ajustes</Text>
        <AnimatedPressable
          style={[styles.button, { transform: [{ scale: scaleValue1 }] }]}
          onPressIn={() => animateScale(scaleValue1, 0.95)}
          onPressOut={() => animateScale(scaleValue1, 1)}
        >
          <Text style={styles.text}>Ajustes Generales</Text>
        </AnimatedPressable>
        <AnimatedPressable
          style={[styles.button, { transform: [{ scale: scaleValue2 }] }]}
          onPressIn={() => animateScale(scaleValue2, 0.95)}
          onPressOut={() => animateScale(scaleValue2, 1)}
        >
          <Text style={styles.text}>Notificaciones</Text>
        </AnimatedPressable>
        <AnimatedPressable
          style={[styles.button, { transform: [{ scale: scaleValue3 }] }]}
          onPressIn={() => animateScale(scaleValue3, 0.95)}
          onPressOut={() => animateScale(scaleValue3, 1)}
        >
          <Text style={styles.text}>Seguridad</Text>
        </AnimatedPressable>
        <NavigationBottomBar />
      </View>
    );
  }
  
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
      paddingTop: 50,
    },
    titulo: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
      marginTop: 20,
    },
    text: {
      fontSize: 20,
      color: "white",
      textAlign: "center",
      marginVertical: 10,
    },
    button: {
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 25,
      backgroundColor: "black",
      borderColor: "black",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
  });