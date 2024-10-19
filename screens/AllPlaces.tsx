import { PlacesList } from "../components/Places/PlacesList";
import { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { PlacesContext } from "../store/places_context";

export function AllPlaces() {
  const placesCtx = useContext(PlacesContext);

  return <PlacesList places={placesCtx.places} />;
}
