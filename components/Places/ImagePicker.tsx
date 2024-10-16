import { Alert, View, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { OutlinedButton } from "../../ui/OutlinedButton";
import { ImagePreview } from "../../ui/ImagePreview";

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
    <View style={styles.pickerContainer}>
      <ImagePreview fallbackText="You have no image picked" uri={pickedImage} />

      <OutlinedButton icon="camera" onPress={handleTakeImg}>
        Take picture
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
});
