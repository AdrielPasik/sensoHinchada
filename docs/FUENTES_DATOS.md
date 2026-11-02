# Fuentes de datos

## Geografía

La referencia seleccionada es [GeoRef](https://www.argentina.gob.ar/georef), servicio público de normalización territorial. Su documentación ofrece descargas de provincias y localidades, incluido GeoJSON. La descarga observada el 2/11/2026 redirige a HTTP, por lo que **no se incorporó automáticamente**: no se aceptan redirecciones inseguras para un activo de build. Antes de conectar el mapa vectorial se definirá una fuente HTTPS/versionada o se verificará el archivo de forma manual y reproducible.

La capa vectorial de Fase 1.1 usa el servicio HTTPS del [Instituto Geográfico Nacional](https://ide.ign.gob.ar/geoservicios/rest/services/servicio_fondos/mapserver/0), que expone GeoJSON. Se descargó el 2/11/2026 filtrando `Objeto = 'Provincia'`, EPSG:4326 y una generalización `maxAllowableOffset=0.05` para reducir su peso web. El archivo versionado `public/data/provincias-ign.geojson` contiene 23 provincias; CABA permanece disponible por selector y se incorporará al mapa tras validar su capa oficial diferenciada.

Las localidades se modelarán con `locality_id` oficial, `province_id`, nombre y desambiguador de municipio/departamento. La elección inicial propuesta es usar localidades GeoRef, sin geocodificar por IP ni guardar GPS.

## Clubes

El catálogo de Fase 1 es local, DEMO y de cobertura parcial: incluye casos de búsqueda prioritarios y clubes europeos conocidos, sin afirmar divisiones actuales y sin escudos. La próxima etapa añadirá origen, ID externo nullable, alias normalizados y sincronización administrativa. API-Football es una posibilidad a evaluar por costos, límites, licencia y cobertura; no está activada ni se requieren credenciales.
