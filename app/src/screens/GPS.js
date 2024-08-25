import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import NavigationBottomBar from "../components/navigationbottom";
import * as Location from 'expo-location';

export default function GPS() {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso para acceder a la ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Tu ubicación"}
            description={"Esta es tu ubicación actual"}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.destinationInput}>
        <Text style={styles.destinationText}>
          Presiona para agregar un destino
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomCard}>
        <Text style={styles.cardTitle}>Posadas Misiones</Text>
        <Text style={styles.cardSubtitle}>1 km (5min)</Text>
      </View>
      <NavigationBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? "#f0f0f0" : "#fff",
  },
  map: {
    flex: 1,
  },
  destinationInput: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  destinationText: {
    color: "#888",
    fontSize: 16,
  },
  bottomCard: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 50,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
