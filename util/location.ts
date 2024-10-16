const key = "AIzaSyC43DcppnWKtPz1a3134wGLiTnNvDq2CcI";

export function getMapPreview(lat: string, lng: string) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${key}`;
  return imagePreviewUrl;
}
