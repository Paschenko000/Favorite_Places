import { Alert, View, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { OutlinedButton } from "../../ui/OutlinedButton";
import { ImagePreview } from "../../ui/ImagePreview";

export function ImagePicker({ onImagePicked }: (uri: string) => void) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  useEffect(() => {
    onImagePicked(pickedImage);
  }, [pickedImage, onImagePicked]);
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
      quality: 0.7,
    });

    setPickedImage(image.assets[0].uri);
  }

  async function handleSelectImage() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    setPickedImage(image.assets[0].uri);
  }

  return (
    <View style={styles.pickerContainer}>
      <ImagePreview fallbackText="You have no image picked" uri={pickedImage} />

      <View style={styles.actions}>
        <OutlinedButton icon="camera" onPress={handleTakeImg}>
          Take picture
        </OutlinedButton>
        <OutlinedButton icon="image-outline" onPress={handleSelectImage}>
          Select picture
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: "center",
    gap: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
