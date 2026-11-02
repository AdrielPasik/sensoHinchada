# Fuentes de datos

## Geografía

La referencia seleccionada es [GeoRef](https://www.argentina.gob.ar/georef), servicio público de normalización territorial. Su documentación ofrece descargas de provincias y localidades, incluido GeoJSON. La descarga observada el 2/11/2026 redirige a HTTP, por lo que **no se incorporó automáticamente**: no se aceptan redirecciones inseguras para un activo de build. Antes de conectar el mapa vectorial se definirá una fuente HTTPS/versionada o se verificará el archivo de forma manual y reproducible.

Las localidades se modelarán con `locality_id` oficial, `province_id`, nombre y desambiguador de municipio/departamento. La elección inicial propuesta es usar localidades GeoRef, sin geocodificar por IP ni guardar GPS.

## Clubes

El catálogo de Fase 1 es local, DEMO y de cobertura parcial: incluye casos de búsqueda prioritarios y clubes europeos conocidos, sin afirmar divisiones actuales y sin escudos. La próxima etapa añadirá origen, ID externo nullable, alias normalizados y sincronización administrativa. API-Football es una posibilidad a evaluar por costos, límites, licencia y cobertura; no está activada ni se requieren credenciales.
