import { Alert, Image, StyleSheet, View } from "react-native";
import { OutlinedButton } from "../../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { getMapPreview } from "../../util/location";
export function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grand camera permissions to use this app.",
      );

      return false;
    }

    return true;
  }

  async function handleGetLocation() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function handlePickOnMap() {}

  return (
    <View style={styles.container}>
      {pickedLocation && (
        <Image
          source={{
            uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
          }}
          style={styles.mapPreview}
        />
      )}

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={handleGetLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handlePickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
