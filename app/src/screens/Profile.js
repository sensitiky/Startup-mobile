import React from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  Pressable,
} from "react-native";
import { Avatar } from "@rneui/themed";

const API_URL =
  "https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128";

const transactions = [
  { id: '1', description: 'Compra en tienda', amount: '-$20.00' },
  { id: '2', description: 'Depósito', amount: '+$100.00' },
  { id: '3', description: 'Pago de servicio', amount: '-$50.00' },
];

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);

  const fetchAvatar = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error("Failed to fetch avatar");
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAvatar().finally(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchAvatar();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          rounded
          source={avatar ? { uri: avatar } : require("../../src/assets/images/avatar.webp")}
          containerStyle={styles.avatar}
          onPress={fetchAvatar}
        />
      </View>
      <Text style={styles.text}>Profile</Text>
      <Text style={styles.text}>Welcome to the Profile Screen</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Monto: $500.00</Text>
      </View>
      <Text style={styles.transactionsTitle}>Transacciones</Text>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.navigationMenu}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>Inicio</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>GPS</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>QR</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>Billetera</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>Configuración</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  flatListContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: "#000",
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },
  balanceContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 20,
  },
  transactionDescription: {
    fontSize: 16,
    color: "#000",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#000",
  },
  navigationMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
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
});