import { Alert, Button, Image, View, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";

export function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grand camera permissions to use this app.",
      );

      return false;
    }

    return true;
  }

  async function handleTakeImg() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  return (
    <View>
      {pickedImage && (
        <Image source={{ uri: pickedImage }} style={styles.image} />
      )}

      <Button title="Take Image" onPress={handleTakeImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    objectFit: "cover",
    borderRadius: 10,
  },
});
