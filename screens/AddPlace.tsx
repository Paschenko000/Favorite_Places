import { PlaceForm } from "../components/Places/PlaceForm";
import { IPlace } from "../models/place.model";

export function AddPlace({ navigation }) {
  function handleCreatePlace(placeData: IPlace) {
    navigation.navigate("AllPlaces", {
      place: placeData,
    });
  }

  return <PlaceForm onSubmit={handleCreatePlace} />;
}
