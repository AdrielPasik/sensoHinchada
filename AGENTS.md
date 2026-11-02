# Senso Hinchada — reglas duraderas

- El repositorio se llama exactamente `sensoHinchada`; no modificar su capitalización al conectarlo a GitHub.
- El producto usa español de Argentina y es un censo colaborativo no oficial. Nunca presentarlo como representativo, estatal o electoral.
- Mientras no haya proveedor legal habilitado, no solicitar, guardar ni validar DNI. `IDENTITY_VERIFICATION_ENABLED` debe quedar en `false`.
- No mezclar DEMO con datos reales. Toda estadística sintética debe etiquetarse como DEMO o datos ficticios.
- No exponer votos, perfiles, emails, nombres, identificadores de Auth ni secretos por rutas públicas.
- La futura DB debe tener una sola participación activa por cuenta mediante constraint y una mutación transaccional; el cliente jamás autoriza `user_id` o roles.
- Usar identificadores canónicos para club, provincia y localidad; texto libre no puede ser el identificador final de localidad.
- Antes de producción, requerir revisión legal de privacidad/términos y decisión de marca, edición de voto y umbrales de publicación.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
