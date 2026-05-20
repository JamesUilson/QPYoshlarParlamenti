import type { Lang } from "./translations";

/**
 * Returns the localized value of a field from a data object.
 * Falls back to the base Uzbek field if the localized version is missing.
 *
 * Example: getLocalized(newsItem, "title", "ru") → item.title_ru || item.title
 */
export function getLocalized<T extends Record<string, any>>(
  item: T,
  field: string,
  lang: Lang
): string {
  if (lang === "uz") return (item[field] as string) || "";
  const localized = item[`${field}_${lang}`] as string | undefined;
  return localized || (item[field] as string) || "";
}
