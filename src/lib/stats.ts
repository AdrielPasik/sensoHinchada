export type RankedValue = { name: string; votes: number };

export function rank<T extends RankedValue>(values: T[], total: number): Array<T & { position: number; percentage: number }> {
  if (total <= 0) return [];
  return [...values].sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name, "es-AR")).map((value, index) => ({ ...value, position: index + 1, percentage: Math.round((value.votes / total) * 1000) / 10 }));
}

export function normalise(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-AR").trim();
}

export function isPublicationAllowed(total: number, minimum = 20) { return total >= minimum; }
