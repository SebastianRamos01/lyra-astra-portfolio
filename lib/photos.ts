import type { StaticImageData } from "next/image";

import barCouple from "@/assets/images/aymane-hanni-2148955127-30710630.webp";
import blueSky from "@/assets/images/dang-vu-hai-683750211-34791082.webp";
import silhouettes from "@/assets/images/gaby-lopez-301814849-36247934.webp";
import redFabric from "@/assets/images/katya-humeniuk-461430699-39706429.webp";
import whiteDress from "@/assets/images/katya-humeniuk-461430699-39706907.webp";
import whiteSuit from "@/assets/images/mesut-cicen-924584954-24789420.webp";
import promenade from "@/assets/images/mesut-cicen-924584954-40167811.webp";
import darkWall from "@/assets/images/noval-39076692.webp";
import sunsetBeach from "@/assets/images/sebastian-3149285.webp";
import boat from "@/assets/images/vikkirillova-8813977.webp";
import camera from "@/assets/images/yasar-baskurt-706180077-32820293.webp";
import shoreSilhouette from "@/assets/images/alexeydemidov-10562337.webp";
import staircase from "@/assets/images/lea-claisse-2160105977-36565202.webp";
import reflection from "@/assets/images/mark5-2164972082-40335953.webp";
import cityWindow from "@/assets/images/phael-34976676.webp";

export type Photo = {
  id: string;
  image: StaticImageData;
  alt: string;
};

// Swap this list for a CMS query (e.g. Sanity) when content goes live.
export const photos: Photo[] = [
  { id: "bar", image: barCouple, alt: "Pareja posando en un bar con sillas rojas" },
  { id: "cielo-azul", image: blueSky, alt: "Hombre de camiseta blanca frente a un cielo azul" },
  { id: "siluetas", image: silhouettes, alt: "Siluetas de personas sobre una colina bajo un cielo gris" },
  { id: "tela-roja", image: redFabric, alt: "Mujer de negro sosteniendo una tela roja al viento junto al agua" },
  { id: "vestido-blanco", image: whiteDress, alt: "Mujer con vestido blanco en un prado entre árboles" },
  { id: "traje-blanco", image: whiteSuit, alt: "Mujer con traje blanco en una calle con un taxi amarillo" },
  { id: "malecon", image: promenade, alt: "Mujer caminando por un malecón junto al mar, vista desde arriba" },
  { id: "muro-oscuro", image: darkWall, alt: "Mujer con atuendo rojo oscuro apoyada en un muro" },
  { id: "atardecer", image: sunsetBeach, alt: "Dos mujeres de espaldas mirando el atardecer en la playa" },
  { id: "bote", image: boat, alt: "Mujer sentada en la proa de un bote de madera" },
  { id: "camara", image: camera, alt: "Mujer con gorra blanca fotografiando en un puerto" },
  { id: "orilla", image: shoreSilhouette, alt: "Silueta de una mujer caminando por la orilla al atardecer" },
  { id: "escalera", image: staircase, alt: "Mujer con vestido de satén junto a una baranda de hierro forjado" },
  { id: "reflejo", image: reflection, alt: "Reflejo de una mujer de rojo en un suelo brillante" },
  { id: "ventanal", image: cityWindow, alt: "Silueta de un hombre frente a un ventanal con vista a la ciudad" },
];

// The page opens on the middle of the strip.
export const initialPhotoIndex = 7;
