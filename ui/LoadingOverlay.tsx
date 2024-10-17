import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from "react-native";
import { Colors } from "../constants/colors";

export function LoadingOverlay({ message }: string) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={styles.loading}>
      <Text style={[styles.message, { color: colors.primary50 }]}>
        {message}
      </Text>
      <ActivityIndicator size="small" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    gap: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
  },
});
