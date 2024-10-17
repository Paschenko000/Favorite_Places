import { FlatList, Text, View, StyleSheet, useColorScheme } from "react-native";
import { IPlace } from "../../models/place.model";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "../../constants/colors";

type PlacesListProps = {
  places: IPlace[];
};
export function PlacesList({ places }: PlacesListProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={[styles.fallbackText, { color: colors.primary200 }]}>
          No places added yet
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.container}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
  container: {
    padding: 15,
  },
});
