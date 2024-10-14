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

export function PlaceForm() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const [enteredTitle, setEnteredTitle] = useState("");

  function handleChangeTitle(enteredText) {
    setEnteredTitle(enteredText);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={[styles.label, { color: colors.primary500 }]}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderBottomColor: colors.primary700,
              backgroundColor: colors.primary100,
            },
          ]}
          onChangeText={handleChangeTitle}
          value={enteredTitle}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderRadius: 10,
  },
});
