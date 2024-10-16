import { Image, StyleSheet, View, Text, useColorScheme } from "react-native";
import { Colors } from "../constants/colors";
export function ImagePreview({
  uri,
  fallbackText,
}: {
  uri?: string | undefined;
  fallbackText: string;
}) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary200 }]}>
      {uri ? (
        <Image style={styles.image} source={{ uri: uri }} />
      ) : (
        <Text style={[styles.text, { color: colors.gray700 }]}>
          {fallbackText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
