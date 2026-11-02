# Privacidad y seguridad

## Estado actual

No se recolecta, transmite ni persiste información personal. El formulario es puramente DEMO. No hay DNI, Auth, base de datos ni servicio externo habilitado.

## Diseño para la siguiente fase

- Email verificado, no identidad verificada. No prometer una persona por voto.
- Sin DNI hasta tener convenio/proveedor legal habilitado, revisión jurídica y diseño aprobado.
- Votos y perfiles privados; rutas públicas solo devuelven agregados autorizados.
- Umbral propuesto: 20 participaciones para publicar localidad y supresión de categorías inferiores a 5.
- RLS, autorización servidor, rate limit, validación Zod, auditoría mínima y secretos solo en servidor.
- Eliminación de cuenta debe anular la participación y recalcular agregados sin conservar datos innecesarios.

La política y términos incluidos en UI son borradores, pendientes de revisión legal conforme a Ley 25.326 y criterios AAIP.
