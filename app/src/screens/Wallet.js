import { View, Text, StyleSheet } from "react-native";

export default function Wallet() {
  return (
    <View style={style.container}>
      <Text style={style.text}>Wallet</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
