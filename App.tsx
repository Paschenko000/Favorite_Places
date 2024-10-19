import { StatusBar } from "expo-status-bar";
import { AddPlace } from "./screens/AddPlace";
import { AllPlaces } from "./screens/AllPlaces";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "./ui/IconButton";
import { useColorScheme } from "react-native";
import { Colors } from "./constants/colors";
import { Map } from "./screens/Map";
import { useContext, useEffect, useState } from "react";
import { LoadingOverlay } from "./ui/LoadingOverlay";
import { PlacesContext, PlacesContextProvider } from "./store/places_context";

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const [dbInitialized, setDbInitialized] = useState(false);

  return (
    <>
      <StatusBar style="dark" />
      <PlacesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary500 },
              headerTintColor: colors.gray700,
              contentStyle: { backgroundColor: colors.gray700 },
            }}
          >
            <Stack.Screen
              options={({ navigation }) => ({
                title: "Favorite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={30}
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              })}
              name="AllPlaces"
              component={AllPlaces}
            />
            <Stack.Screen
              options={{ title: "Add New Place", headerBackTitle: "Back" }}
              name="AddPlace"
              component={AddPlace}
            />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </PlacesContextProvider>
    </>
  );
}
