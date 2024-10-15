import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

type OutlinedButtonProps = {
  icon: string;
  children: React.ReactNode;
  onPress: () => void;
};
export function OutlinedButton({
  icon,
  children,
  onPress,
}: OutlinedButtonProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { borderColor: colors.primary500 },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={18} color={colors.primary500} />
      <Text style={[styles.text, { color: colors.primary500 }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexShrink: 0,
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
