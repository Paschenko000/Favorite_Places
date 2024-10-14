import { IPlace } from "@/models/place.model";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PlaceItemProps = {
  place: IPlace;
  onSelect: () => {};
};
export function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imgUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
