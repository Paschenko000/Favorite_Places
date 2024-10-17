import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { IPlace } from "../../models/place.model";

type PlaceItemProps = {
  place: IPlace;
  onSelect: () => {};
};
export function PlaceItem({ place, onSelect }: PlaceItemProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: colors.primary500 },
        pressed && styles.pressed,
      ]}
    >
      <Image style={styles.image} source={{ uri: place.imgUri }} />
      <View style={styles.info}>
        <Text style={[{ color: colors.gray700 }, styles.title]}>
          {place.title}
        </Text>
        <Text style={[{ color: colors.primary800 }, styles.address]}>
          {place.address}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  address: {
    fontSize: 16,
    fontWeight: "500",
  },
});
