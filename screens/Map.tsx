import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { IconButton } from "../ui/IconButton";

export function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleSelectLocation(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!",
      );
      return;
    }

    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          size={30}
          icon="save"
          color={tintColor}
          onPress={handleSavePickedLocation}
        />
      ),
    });
  }, [navigation, handleSavePickedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
