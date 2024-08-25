import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ImageUrl = [
  { id: "1", url: require("../assets/images/home-svgrepo-com.png") },
  { id: "2", url: require("../assets/images/gps-svgrepo-com.png") },
  { id: "3", url: require("../assets/images/qr-code-svgrepo-com.png") },
  { id: "4", url: require("../assets/images/wallet-svgrepo-com.png") },
  { id: "5", url: require("../assets/images/settings-svgrepo-com.png") },
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
          <Image source={image.url} style={styles.navImage} />
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
    fontSize: 16,
    color: "#000",
  },
  navImage: {
    width: 30,
    height: 30,
  },
});

export default NavigationBottomBar;
