import { type Colour, type Pickup, type Shape } from "@prisma/client";
import { z } from "zod";

const pickups = [
  "ElectroAcoustic",
  "SS",
  "SSS",
  "HH",
  "HHH",
  "HS",
  "HSS",
  "HSH",
  "P90",
  "S",
  "H",
] as const;

export const PickupSchema = z
  .number()
  .min(1)
  .max(pickups.length)
  .transform((e) => (pickups[e] ?? "ElectroAcoustic") as Pickup)
  .or(z.enum(pickups));

const colours = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "Gold",
  "Silver",
  "Grey",
  "Black",
  "White",
  "Natural",
  "Multicolour",
] as const;

export const ColourSchema = z
  .number()
  .min(1)
  .max(colours.length)
  .transform((e) => (colours[e] ?? "Red") as Colour)
  .or(z.enum(colours));

const shapes = [
  "SStyle",
  "TStyle",
  "DoubleCut",
  "Offset",
  "HollowBody",
  "VStyle",
  "SmallBody",
  "Orchestral",
  "GrandAuditorium",
  "Dreadnought",
  "Jumbo",
  "Explorer",
  "SingleCut",
  "Combo",
  "Head",
  "Cabinet",
] as const;

export const ShapeSchema = z
  .number()
  .min(1)
  .max(shapes.length)

  .transform((e) => (shapes[e] ?? "SStyle") as Shape)
  .or(z.enum(shapes));

export const ImagesSchema = z
  .null()
  .transform((_) => [] as string[])
  .or(z.array(z.string()));
