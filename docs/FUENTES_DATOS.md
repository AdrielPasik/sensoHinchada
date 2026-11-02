# Fuentes de datos

## Geografía

La referencia seleccionada es [GeoRef](https://www.argentina.gob.ar/georef), servicio público de normalización territorial. Su documentación ofrece descargas de provincias y localidades, incluido GeoJSON. La descarga observada el 2/11/2026 redirige a HTTP, por lo que **no se incorporó automáticamente**: no se aceptan redirecciones inseguras para un activo de build. Antes de conectar el mapa vectorial se definirá una fuente HTTPS/versionada o se verificará el archivo de forma manual y reproducible.

La capa vectorial usa el servicio HTTPS del [Instituto Geográfico Nacional](https://ide.ign.gob.ar/geoservicios/rest/services/servicio_fondos/mapserver/0), que expone GeoJSON. Se descargó el 2/11/2026 filtrando `Objeto = 'Provincia'`, EPSG:4326 y una generalización `maxAllowableOffset=0.05` para reducir su peso web. El archivo `public/data/provincias-ign.geojson` contiene 23 provincias y `public/data/caba-ign.geojson` incorpora CABA como jurisdicción diferenciada desde la misma fuente oficial.

Las localidades se modelarán con `locality_id` oficial, `province_id`, nombre y desambiguador de municipio/departamento. La elección inicial propuesta es usar localidades GeoRef, sin geocodificar por IP ni guardar GPS.

## Clubes

El catálogo local DEMO amplía la cobertura de clubes argentinos históricamente presentes en Primera División, Primera Nacional, Primera B, Primera C y Federal A, además de principales europeos. Incluye aliases buscables y no afirma divisiones de temporada ni usa escudos. Aún no constituye un padrón exhaustivo: la migración prepara `clubs` y `club_aliases` para una importación administrable, con origen e ID externo nullable. API-Football es una posibilidad a evaluar por costos, límites, licencia y cobertura; no está activada ni se requieren credenciales.
