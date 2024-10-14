export interface IPlace {
  id: number;
  title: string;
  imgUri: string;
  address: string;
  location: { lat: number; lng: number };
}
