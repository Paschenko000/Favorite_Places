import { createContext, Reducer, useEffect, useReducer } from "react";
import { IPlace } from "../models/place.model";
import { getItem, storeData } from "../util/storage";

export const PlacesContext = createContext({
  places: [],
  addPlace: ({ id, title, imgUri, address, location }: IPlace) => {},
});

export interface IPlacesReducerAction {
  type: EPlacesReducerActions;
  payload: any;
}

export enum EPlacesReducerActions {
  Add = "ADD",
  Set = "SET",
}

const PlacesReducer: Reducer<IPlace[], IPlacesReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "ADD":
      const id = Math.random();
      const expensesAdd = [{ ...action.payload, id }, ...state];
      storeData("EXPENSES", expensesAdd);
      return expensesAdd;
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

export function PlacesContextProvider({ children }: React.ReactNode) {
  const [expensesState, dispatch] = useReducer<
    Reducer<IPlace[], IPlacesReducerAction>
  >(placesReducer, null);

  useEffect(() => {
    const data = getItem();

    if (data) {
      dispatch({ type: EPlacesReducerActions.Set, payload: data });
    } else {
      dispatch({ type: EPlacesReducerActions.Set, payload: [] });
    }
  }, []);

  function addPlace(expenseData: IPlace) {
    dispatch({ type: EPlacesReducerActions.Add, payload: expenseData });
  }

  const value = {
    expenses: expensesState,
    addExpense: addPlace,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}
