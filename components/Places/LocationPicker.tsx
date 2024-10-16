import { Alert, StyleSheet, View } from "react-native";
import { OutlinedButton } from "../../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { PermissionStatus } from "expo-image-picker";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ImagePreview } from "../../ui/ImagePreview";
export function LocationPicker({ onLocationPicked }: (location) => void) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params.pickedLocation;
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng,
        );
        onLocationPicked({ ...pickedLocation, address });
      }
    }
    handleLocation();
  }, [pickedLocation, onLocationPicked]);

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

  function handlePickOnMap() {
    navigation.navigate("Map");
  }

  return (
    <View style={styles.container}>
      <ImagePreview
        fallbackText="You have no selected location"
        uri={
          pickedLocation &&
          getMapPreview(pickedLocation.lat, pickedLocation.lng)
        }
      />

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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
