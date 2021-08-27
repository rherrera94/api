
# Trabajo final de la materia Práctica Profesional III de la carrera Tec. en Análisis de Sistemas.
## En ésta seccion se encuentra la api del sistema a desarrollar.

**Nota: se configuraron ciertas variables de entorno que deberán tambien ser configuradas, en nuestro caso pusimos el PORT como 5500 pero ese puerto dependerá de lo que se tenga configurado tambien habra que configurar como variables de entorno APP_USER, APP_HOST, APP_DB que son las variables que se necesitarán para la comunicación a la BBDD**

## Rutas de la api
  #### legitimo abono (/legitimoab):

   * `POST` | localhost:5500/legitimoab en este caso hay un html para hacer la prueba de la ruta ya que se tiene que cargar un pdf y por el postman por algún motivo no dejaba subir un json y un archivo a la vez asi que generamos un pequeño html para poder probarlo. Si pone node app.js y accede al localhost:5500 podra ingresar al html correspondiente.

  **Las que probamos con postman de /legitimoab**

   * `GET` | localhost:5500/legitimoab -> devuelve un JSON con el listado generalizado de los legitimos abonos cargados al momento.

   * `GET` | localhost:5500/legitimoab /:id-> devuelve un JSON con el legitimo abono con numero de id que se pasa por parametros.

   * `GET` | localhost:5500/legitimoab /proveedor/:id -> devuelve un JSON con todos los legitimos abonos que son del proveedor de id que se pasa por parámetro.

   * `GET` | localhost:5500/legitimoab /proveedor/cuit/:cuit -> devuelve un JSON con todos los legitimos abonos que son del proveedor de cuit que se pasa por parámetro.

   * `GET` | localhost:5500/legitimoab /organismo/:id -> devuelve un JSON con todos los legitimos abonos que son del organismo de id que se pasa por parámetro.

   * `PUT` | localhost:5500/legitimoab /borrado/:id -> realiza un borrado lógico del legitimo abono que tiene por id el que se pasa por parametro.

  #### proveedores (/proveedor):

   * `POST` | localhost:5500/proveedor -> crea un nuevo proveedor.

   * `GET` | localhost:5500/proveedor -> devuelve listado generalizado de los proveedores

   * `GET` | localhost:5500/proveedor/:id -> devuelve proveedor de id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/proveedor/cuit/:cuit -> devuelve proveedor de cuit igual al que se pasa por parámetro.

   * `GET` | localhost:5500/proveedor/nombre/:rsoc -> devuelve proveedor de razón social igual al que se pasa por parámetro.

   * `PUT` | localhost:5500/proveedor/borrado/:cuit -> eliminación lógica de un proveedor según su número de cuit.

  #### tipos de licitaciones (/tlicitacion):

   * `POST` | localhost:5500/tlicitacion -> crea un nuevo tipo de licitacion.

   * `GET` | localhost:5500/tlicitacion -> devuelve un JSON con el listado generalizado de los tipos de licitaciones cargados al momento.

   * `GET` | localhost:5500/tlicitacion/:id -> si hay devuelve tipo de licitación con id igual al que se pasa por parámetro.

   * `PUT` | localhost:5500/tlicitacion/borrado/:id -> eliminación lógica de un tipo de licitacion según su número de id.

  #### provincia (/provincia):

   **Nota: para actualizar el json contenedor de todas las provincias utilizar el comando npm run actualizarProvincias**

   * `GET` | localhost:5500/provincia -> devuelve el listado generalizado de provincias argentinas registradas.

   * `GET` | localhost:5500/provincia/:id -> devuelve provincia con id que se pasa por parámetro.

   * `GET` | localhost:5500/provincia/nombre/:nombre -> devuelve provincia con nombre que se pasa por parámetro.

  #### Rutas de localidad (/localidad):

  **Nota: para actualizar el json contenedor de todas las localidades utilizar el comando npm run actualizarLocalidades**
   * `GET` | localhost:5500/localidad -> devuelve el listado generalizado de localidades argentinas registradas.

   * `GET` | localhost:5500/localidad/:id -> devuelve localidad con id que se pasa por parámetro.

   * `GET` | localhost:5500/localidad/nombre/:nombre -> devuelve localidad con nombre que se pasa por parámetro.

   #### Rutas de empleados (/empleado):

   * `POST` | localhost:5500/empleado -> crea un nuevo empleado.

   * `GET` | localhost:5500/empleado -> devuelve un JSON con el listado generalizado de los empleados cargados al momento.

   * `GET` | localhost:5500/empleado/:id -> si hay devuelve empleado con id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/empleado/cuil/:cuil -> devuelve empleado con cuit igual al que se pasa por parámetro.

#### Rutas de organismos (/organismo):

   * `GET` | localhost:5500/organismo -> Devuelve un listado generalizado con todos los organismo existentes en la  base de datos.

   * `GET` | localhost:5500/organismo/:id -> si hay devuelve organismo con id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/organismo/cuit/:cuit -> devuelve organismo con cuit igual al que se pasa por parámetro.
   * `GET` | localhost:5500/organismo/denominacion/:denominacion -> devuelve organismo con denominacion igual a la que se pasa por parámetro.
