import React from "react";
import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ImageUrl = [
  { id: "1", src: require("../assets/images/home.png"), description: "Inicio" },
  { id: "2", src: require("../assets/images/gps.png"), description: "GPS" },
  { id: "3", src: require("../assets/images/qr.png"), description: "QR" },
  {
    id: "4",
    src: require("../assets/images/wallet.png"),
    description: "Billetera",
  },
  {
    id: "5",
    src: require("../assets/images/settings.png"),
    description: "Ajustes",
  },
];

const NavigationBottomBar = () => {
  const navigation = useNavigation();

  const handlePress = (id) => {
    if (id === "3") {
      navigation.navigate("QR");
    }
    if (id === "1") {
      navigation.navigate("Profile");
    }
    if (id === "2") {
      navigation.navigate("GPS");
    }
    if (id === "5") {
      navigation.navigate("Settings");
    }
  };

  return (
    <View style={styles.navigationMenu}>
      {ImageUrl.map((image) => (
        <Pressable
          key={image.id}
          style={styles.navItem}
          onPress={() => handlePress(image.id)}
        >
          <Image source={image.src} style={styles.navImage} />
          <Text style={styles.navText}>{image.description}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
  },
  navImage: {
    width: 20,
    height: 20,
  },
});

export default NavigationBottomBar;
