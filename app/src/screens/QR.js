import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import NavigationBottomBar from "../components/navigationbottom";

export default function QR() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Tu código QR</Text>
      <QRCode value="mailto:mariomcorrea3@gmail.com" size={200} />
      <NavigationBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
});
