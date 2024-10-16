const key = "AIzaSyC43DcppnWKtPz1a3134wGLiTnNvDq2CcI";

export function getMapPreview(lat: string, lng: string) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${key}`;
  return imagePreviewUrl;
}

export async function getAddress(lat: string, lng: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
