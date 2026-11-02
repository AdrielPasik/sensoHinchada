# Persistencia preparada

La migración `supabase/migrations/0001_core.sql` prepara el modelo para Supabase/PostgreSQL sin activar ningún servicio externo. Contiene perfiles privados, clubes y aliases, geografía normalizada, votos con índice parcial que impide más de una participación activa por cuenta, consentimientos y auditoría.

La escritura de votos queda deliberadamente sin política cliente: la Fase 2 incorporará una RPC transaccional revisada que usa `auth.uid()`, validación Zod de servidor y rate limiting. No se guardan DNI, nombre ni apellido. La interfaz futura de verificación de identidad seguirá apagada hasta contar con proveedor autorizado.

Los agregados públicos se calcularán exclusivamente desde votos `active`, con mínimo de 20 participantes por localidad y supresión de categorías menores a 5.
