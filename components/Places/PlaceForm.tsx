import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TextInput,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useCallback, useState } from "react";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";
import { Button } from "../../ui/Button";
import { IPlace } from "../../models/place.model";

export function PlaceForm({ onSubmit }: () => void) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [pickedImage, setPickedImage] = useState();

  function handleChangeTitle(enteredText) {
    setEnteredTitle(enteredText);
  }

  function handleImagePicked(uri) {
    setPickedImage(uri);
  }

  const handleLocationPicked = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function handleSubmit() {
    const placeData: IPlace = {
      id: new Date().toString() + Math.random().toString(),
      title: enteredTitle,
      imgUri: pickedImage,
      address: pickedLocation.address,
      location: { lat: pickedLocation.lat, lng: pickedLocation.lng },
    };
    onSubmit(placeData);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.primary200,
                color: colors.gray700,
              },
            ]}
            placeholder="Name your favorite place.."
            placeholderTextColor={colors.primary800}
            onChangeText={handleChangeTitle}
            value={enteredTitle}
          />
        </View>
        <ImagePicker onImagePicked={handleImagePicked} />
        <LocationPicker onLocationPicked={handleLocationPicked} />
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
    fontSize: 18,
  },
  input: {
    padding: 8,
    fontSize: 16,
    height: 50,
    borderRadius: 10,
  },
});
