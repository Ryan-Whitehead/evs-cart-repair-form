export type Lang = "en" | "es";

export const labels = {
  title: {
    en: "Catholic Health EVS Cart Repair Form",
    es: "Formulario de Reparación de Carritos EVS de Catholic Health",
  },
  location: { en: "Location", es: "Ubicación" },
  shift: { en: "Shift", es: "Turno" },
  cartNumber: { en: "Cart Number", es: "Número de Carrito" },
  brokenParts: {
    en: "What is broken or missing?",
    es: "¿Qué está roto o falta?",
  },
  photo: { en: "Upload a Photo", es: "Subir una Foto" },
  photoHint: {
    en: "Click to choose a file or drag here",
    es: "Haga clic para elegir un archivo o arrástrelo aquí",
  },
  reportedBy: { en: "Reported By", es: "Reportado Por" },
  submit: { en: "Submit Form", es: "Enviar Formulario" },
  selectPlaceholder: { en: "Select...", es: "Seleccionar..." },
} as const;

export const shiftOptions = [
  { id: "day", en: "Day", es: "Día" },
  { id: "evening", en: "Evening", es: "Tarde" },
  { id: "night", en: "Night", es: "Noche" },
];

export const brokenPartsOptions = [
  { id: "wheels", en: "Wheels", es: "Ruedas" },
  { id: "handle", en: "Handle / Push Bar", es: "Mango / Barra" },
  { id: "frame", en: "Frame / Body", es: "Marco / Cuerpo" },
  { id: "topShelf", en: "Top Shelf", es: "Estante Superior" },
  { id: "middleShelf", en: "Middle Shelf", es: "Estante Medio" },
  { id: "bottomShelf", en: "Bottom Shelf", es: "Estante Inferior" },
  { id: "drawer", en: "Drawer", es: "Cajón" },
  {
    id: "trashBagFrame",
    en: "Trash Bag Frame",
    es: "Marco de Bolsa de Basura",
  },
  { id: "trashBag", en: "Trash Bag", es: "Bolsa de Basura" },
  {
    id: "bagStraps",
    en: "Bag Straps / Clips / Hooks",
    es: "Correas / Clips / Ganchos de Bolsa",
  },
  { id: "mopClip", en: "Mop / Broom Clip", es: "Clip de Trapeador / Escoba" },
  { id: "keyLock", en: "Key Lock", es: "Cerradura" },
  { id: "bucketHolder", en: "Bucket Holder", es: "Soporte de Cubeta" },
  { id: "rollingTop", en: "Rolling Top", es: "Tapa Rodante" },
];

export const locationOptions: { id: string; label: string; email: string }[] = [
  {
    id: "location-1",
    label: "Good Samaritian Hospital",
    email: "David.Diaz@crothall.com",
  },
  {
    id: "location-2",
    label: "St.Francis Hospital",
    email: "Valeria.Fequirre@crothall.com",
  },
  {
    id: "location-3",
    label: "William Press this",
    email: "William.Marulanda@crothall.com",
  },
  {
    id: "location-4",
    label: "Test",
    email: "Ryan.whitehead@crothall.com",
  },
];
