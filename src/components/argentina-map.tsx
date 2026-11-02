"use client";

import { useEffect, useState } from "react";
import { provinces } from "@/data/demo";

type Position = [number, number];
type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: Position[][] | Position[][][] };
type Feature = { geometry: Geometry; properties: { FNA: string; IN1: string } };
type Collection = { features: Feature[] };

const colors: Record<string, string> = { "Boca Juniors":"#2c75c1", "River Plate":"#e44c4c", "Rosario Central":"#efbd3d", "Patronato":"#eff3f5", "Talleres":"#7e9bb1", "Atlético Tucumán":"#6fa0ce" };
const minLon = -74, maxLon = -52, minLat = -56, maxLat = -21;
const point = ([lon, lat]: Position) => `${((lon - minLon) / (maxLon - minLon) * 500).toFixed(1)},${((maxLat - lat) / (maxLat - minLat) * 760).toFixed(1)}`;
const polygons = (geometry: Geometry): Position[][][] => geometry.type === "Polygon" ? [geometry.coordinates as Position[][]] : geometry.coordinates as Position[][][];

export function ArgentinaMap({ selected, onSelect }: { selected?: string; onSelect: (name: string) => void }) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => { Promise.all(["/data/provincias-ign.geojson", "/data/caba-ign.geojson"].map((url) => fetch(url).then((response) => response.ok ? response.json() as Promise<Collection> : Promise.reject()))).then((collections) => setFeatures(collections.flatMap((collection) => collection.features))).catch(() => setError(true)); }, []);
  if (error) return <p className="notice">No se pudo cargar la capa geográfica. El selector accesible sigue disponible debajo.</p>;
  return <div className="vector-map" aria-busy={features.length === 0}><svg viewBox="0 0 500 760" role="img" aria-label="Mapa de provincias argentinas. Elegí una provincia para ver sus estadísticas.">{features.map((feature) => { const province = provinces.find((item) => item.id === feature.properties.IN1); const name = province?.name ?? feature.properties.FNA; const fill = colors[province?.leader ?? ""] ?? "#39798c"; return <g key={feature.properties.IN1}><title>{name}</title>{polygons(feature.geometry).map((polygon, index) => <polygon key={index} points={polygon[0].map(point).join(" ")} fill={fill} className={selected === name ? "map-shape is-selected" : "map-shape"} onClick={() => onSelect(name)} tabIndex={index === 0 ? 0 : -1} role={index === 0 ? "button" : undefined} aria-label={index === 0 ? name : undefined} onKeyDown={(event) => { if (index === 0 && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onSelect(name); } }}/>)}</g>; })}</svg>{features.length === 0 && <p className="muted">Cargando geometrías oficiales…</p>}</div>;
}
