import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TextInput,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";

export function PlaceForm() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const [enteredTitle, setEnteredTitle] = useState("");

  function handleChangeTitle(enteredText) {
    setEnteredTitle(enteredText);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={[styles.label, { color: colors.primary500 }]}>
            Title
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.primary200,
              },
            ]}
            onChangeText={handleChangeTitle}
            value={enteredTitle}
          />
        </View>
        <ImagePicker />
        <LocationPicker />
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
    marginBottom: 15,
    padding: 8,
    fontSize: 16,
    height: 50,
    borderRadius: 10,
  },
});
