import { PlaceForm } from "../components/Places/PlaceForm";
import { IPlace } from "../models/place.model";
import { useContext } from "react";
import { PlacesContext } from "../store/places_context";

export function AddPlace({ navigation }) {
  const placesCtx = useContext(PlacesContext);
  function handleCreatePlace(placeData: IPlace) {
    placesCtx.addPlace({ ...placeData });

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onSubmit={handleCreatePlace} />;
}
