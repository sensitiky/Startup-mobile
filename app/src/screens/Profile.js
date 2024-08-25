import React from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Avatar } from "@rneui/themed";
import DropdownComponent from "../components/Dropdown";

const API_URL =
  "https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128";

const transactions = [
  { id: "1", description: "Compra en tienda", amount: "-$20.00" },
  { id: "2", description: "Depósito", amount: "+$100.00" },
  { id: "3", description: "Pago de servicio", amount: "-$50.00" },
];
const usuario = {
  id: "1",
  nombre: "Juan ",
  apellido: "Perez",
  edad: "25",
  correo: "test@test.com",
};

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
          source={
            avatar
              ? { uri: avatar }
              : require("../../src/assets/images/avatar.webp")
          }
          containerStyle={styles.avatar}
          onPress={fetchAvatar}
        />
      </View>
      <Text style={styles.text}>
        Perfil {"\n"}
        {usuario.nombre}
        {usuario.apellido}
      </Text>
      <Text style={styles.text}>Bievenido a su inicio</Text>

      <View style={styles.balanceContainer}>
        <DropdownComponent />
        <Text style={styles.balanceText}>Saldo: $500.00</Text>
        <Image
          style={styles.filter}
          source={require("../../src/assets/public/filter.png")}
        />
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
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 50,
    flexDirection: "row",
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
  filter: {
    width: 30,
    height: 30,
    margin: 5,
  },
});
