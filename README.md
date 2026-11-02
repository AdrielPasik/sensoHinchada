# Senso Hinchada

Plataforma colaborativa y **no oficial** para explorar participaciones voluntarias sobre clubes de fútbol en Argentina. Esta primera entrega es una interfaz DEMO: no hay base de datos, Auth ni votos reales.

## Estado

Fase 0 y Fase 1 implementadas en la rama `feat/fase-01-experiencia-demo`:

- Inicio con identidad visual original, ranking y selector provincial responsivo.
- `/explorar`: búsqueda de clubes/provincias, selector accesible y ranking DEMO.
- `/participar`: flujo demostrativo que no guarda datos ni solicita DNI.
- `/club/[slug]`, `/como-funciona`, `/metodologia`, `/privacidad` y `/terminos`.
- Catálogo DEMO local con aliases prioritarios (incluye Colón, Unión, Temperley y Excursionistas).

## Ejecutar en Windows (PowerShell)

```powershell
cd "C:\Users\Personal\Documents\PROYECTOS\Senso hinchadas"
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). Para producción local:

```powershell
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Variables

Copiá `.env.example` a `.env.local` solo cuando haya un proyecto Supabase autorizado. Nunca subas claves. `IDENTITY_VERIFICATION_ENABLED` permanece en `false`: no se pide ni almacena DNI.

## Datos y límites

Cada cifra visible en esta versión se identifica como **DEMO** o **datos ficticios**. No representa participantes reales ni una estimación de población. La geografía se planifica sobre GeoRef; el detalle y la decisión de fuente HTTPS están en `docs/FUENTES_DATOS.md`.

## Documentación

- `docs/PRODUCTO.md`: alcance y métricas.
- `docs/ARQUITECTURA.md`: estructura y siguiente fase.
- `docs/PRIVACIDAD_Y_SEGURIDAD.md`: datos, riesgos y bloqueos.
- `docs/DECISIONES.md`: elecciones pendientes para producto.
- `docs/PLAN.md`: fases y estado comprobable.
