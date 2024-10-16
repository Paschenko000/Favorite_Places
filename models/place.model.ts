export interface IPlace {
  id: string;
  title: string;
  imgUri: string;
  address: string;
  location: { lat: number; lng: number };
}
