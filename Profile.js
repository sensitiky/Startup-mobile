import React from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Avatar } from "@rneui/themed";

const API_URL =
  "https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128";

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            rounded
            source={avatar ? { uri: avatar } : require("./public/avatar.webp")}
            containerStyle={styles.avatar}
            onPress={fetchAvatar}
          />
        </View>
        <Text style={styles.text}>Profile</Text>
        <Text style={styles.text}>Welcome to the Profile Screen</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
