"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clubs, provinces, totalDemoVotes } from "@/data/demo";
import { normalise, rank } from "@/lib/stats";

const leaderColors: Record<string, string> = { "Boca Juniors":"#2c75c1", "River Plate":"#e44c4c", "Rosario Central":"#efbd3d", "Patronato":"#fff", "Talleres":"#7e9bb1", "Atlético Tucumán":"#6fa0ce" };

export function Ranking({ limit = 10, total = totalDemoVotes }: { limit?: number; total?: number }) {
  const scopedClubs = total === totalDemoVotes ? clubs : clubs.map((club) => ({ ...club, votes: Math.round((club.votes / totalDemoVotes) * total) }));
  const ranked = rank(scopedClubs, total).slice(0, limit);
  return <ol className="rank-list">{ranked.map((club) => <li className="rank-row" key={club.slug}><span className="rank-index">{club.position}</span><Link href={`/club/${club.slug}`}><span className="rank-name">{club.name}</span><div className="rank-bar"><span style={{ width:`${Math.max(club.percentage * 2.6, 4)}%`, backgroundColor:club.color }}/></div></Link><span className="rank-value">{club.votes.toLocaleString("es-AR")}<br/><small>{club.percentage}%</small></span></li>)}</ol>;
}

export function ProvinceBoard({ selected, onSelect }: { selected?: string; onSelect?: (name: string) => void }) {
  return <div className="province-board" role="group" aria-label="Provincias argentinas; seleccioná una para ver su ranking">{provinces.map((province) => <button className="province" style={{ backgroundColor: leaderColors[province.leader] ?? "#39798c" }} aria-pressed={selected === province.name} onClick={() => onSelect?.(province.name)} key={province.id}><span>{province.name.replace("Ciudad Autónoma de ", "")}</span><small>{province.votes.toLocaleString("es-AR")}</small></button>)}</div>;
}

export function Explorer() {
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [mode, setMode] = useState<"lideres" | "participaciones">("lideres");
  const matches = useMemo<Array<{ type: string; value: string; href?: string }>>(() => {
    const needle = normalise(query);
    if (!needle) return [];
    return [...clubs.filter((club) => [club.name, ...club.aliases].some((value) => normalise(value).includes(needle))).map((club) => ({ type:"Club", value:club.name, href:`/club/${club.slug}` })), ...provinces.filter((province) => normalise(province.name).includes(needle)).map((province) => ({ type:"Provincia", value:province.name }))].slice(0, 6);
  }, [query]);
  const province = provinces.find((item) => item.name === selectedProvince);
  const scopeTotal = province?.votes ?? totalDemoVotes;
  return <div className="explorer-layout"><div><div className="card"><div className="filter-bar"><label><span className="sr-only">Buscar club o provincia</span><input className="field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar club o provincia…" /></label><button className="button button-primary" onClick={() => setQuery("")}>Limpiar</button></div>{query && <div aria-live="polite">{matches.length ? matches.map((match) => match.href ? <Link className="card" style={{ display:"block", marginBottom:".4rem" }} href={match.href} key={match.value}>{match.type}: <strong>{match.value}</strong></Link> : <button className="card" style={{ width:"100%", textAlign:"left", marginBottom:".4rem", cursor:"pointer" }} onClick={() => { setSelectedProvince(match.value); setQuery(""); }} key={match.value}>{match.type}: <strong>{match.value}</strong></button>) : <p className="muted">No encontramos coincidencias en el catálogo DEMO.</p>}</div>}<div className="mode-tabs" aria-label="Modo de mapa"><button aria-pressed={mode === "lideres"} onClick={() => setMode("lideres")}>Club líder</button><button aria-pressed={mode === "participaciones"} onClick={() => setMode("participaciones")}>Intensidad</button></div><div className="map-card"><div className="map-head"><div><strong>Argentina por provincia</strong><br/><small>{mode === "lideres" ? "Color: club con más votos" : "Color: volumen de participaciones"}</small></div><span className="demo-tag">DEMO</span></div><ProvinceBoard selected={selectedProvince} onSelect={setSelectedProvince}/><div className="legend"><span><i style={{ background:"#2c75c1" }}/> Boca Juniors</span><span><i style={{ background:"#e44c4c" }}/> River Plate</span><span><i style={{ background:"#efbd3d" }}/> Rosario Central</span></div></div><p className="muted" style={{ fontSize:".8rem" }}>Selector provincial accesible DEMO. La capa geográfica oficial de GeoRef queda incorporada como fuente de sincronización para la siguiente iteración del mapa vectorial.</p></div></div><aside className="card"><span className="demo-tag">DATOS DEMO</span><p className="eyebrow" style={{ marginTop:"1rem" }}>{province ? `Argentina > ${province.name}` : "Argentina"}</p><h2 style={{ fontSize:"1.7rem", margin:".3rem 0" }}>{province ? province.name : "Ranking nacional"}</h2><p className="muted">{scopeTotal.toLocaleString("es-AR")} participaciones de muestra. Los porcentajes usan este total como denominador.</p>{province && <button className="button button-secondary" onClick={() => setSelectedProvince(undefined)}>Volver a nacional</button>}<Ranking total={scopeTotal}/><p className="notice">Las cifras de esta vista son sintéticas y sirven solo para revisar la experiencia. No representan votos reales.</p></aside></div>;
}
