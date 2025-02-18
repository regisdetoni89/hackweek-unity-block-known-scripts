// The keys match exactly how they are stored in the database

import { BundledLanguage } from "shiki";

// TODO: Consistency in naming
export const MOUSE_SOFTWARE_EXTENSIONS = {
  "Logitech GHUB": ".lua",
  "Razer Synapse": ".xml",
  RedDragon: ".MSMACRO",
} as const;

// Map database source to lang
export const SOFTWARE_TO_LANGUAGE = {
  "Logitech GHUB": "lua",
  "Razer Synapse": "lua",
  RedDragon: "javascript",
} as const;

type SoftwareName = keyof typeof SOFTWARE_TO_LANGUAGE;

export function getSyntaxLanguage(software: string): BundledLanguage {
  return SOFTWARE_TO_LANGUAGE[software as SoftwareName] ?? "javascript";
}

// Map database to display names
export const SOFTWARE_DISPLAY_NAMES = {
  "Logitech GHUB": "Logitech G HUB",
  "Razer Synapse": "Razer Synapse",
  RedDragon: "RedDragon",
} as const;

export function getDisplayName(software: string): string {
  return SOFTWARE_DISPLAY_NAMES[software as SoftwareName] ?? software;
}
