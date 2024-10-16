import { Pressable, StyleSheet, useColorScheme, Text } from "react-native";
import { Colors } from "../constants/colors";

export function Button({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.primary800 },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, { color: colors.primary50 }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.7,
  },
});
