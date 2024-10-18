import { PlaceForm } from "../components/Places/PlaceForm";
import { IPlace } from "../models/place.model";
import { insertPlace } from "../util/database";

export function AddPlace({ navigation }) {
  async function handleCreatePlace(placeData: IPlace) {
    await insertPlace(placeData);
    navigation.navigate("AllPlaces", {
      place: placeData,
    });
  }

  return <PlaceForm onSubmit={handleCreatePlace} />;
}
