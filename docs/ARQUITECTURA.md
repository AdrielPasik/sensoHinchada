# Arquitectura

Next.js App Router + TypeScript estricto + Tailwind CSS 4. Las capas actuales son `components` (vista), `data` (catálogo DEMO) y `lib` (reglas puras). La siguiente fase agregará `supabase/migrations`, acceso a datos servidor, Zod y adaptadores de proveedores, sin SQL desde el cliente.

El modo DEMO es intencionalmente local y está separado de las futuras fuentes reales. El mapa actual es un selector accesible de provincias; la capa vectorial oficial se conectará desde una caché versionada de GeoRef, no desde votaciones individuales.

La futura base usará `profiles`, `clubs`, `club_aliases`, `provinces`, `localities`, `votes`, `consent_records`, `admin_audit_events` y agregados públicos. `votes` tendrá una unicidad para la participación activa por `user_id`, claves foráneas y operación atómica. Auth/RLS y roles se aplicarán del lado servidor.
