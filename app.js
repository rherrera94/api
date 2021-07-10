
const express= require('express');
const jwt= require('jsonwebtoken');
const unless= require('express-unless');
const bcrypt= require('bcrypt');
const app=express();
require('dotenv').config();
const port= process.env.PORT? process.env.PORT:3000; //si se encuentra el PORT, en las variables de entorno, lo utiliza sino usa puerto 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/***
 * RUTAS:
 * Proveedor (/proveedor)-> empresa o persona física que se inscribe como proveedor del Estado.
 * Empleado (/empleado)-> Empleado de un Organismo del Estado, que esta inscripto en el sistema.
 * Organismo (/organismo)-> Organismo perteneciente al Estado, que esta inscripto en el sistema.
 * tlicitacion (/tlicitacion)-> tipo de licitacion.
 * direccion (/direccion)-> direcciones.
 */

const routeProveedor= require('./routes/rutasProveedor');
const routeEmpleado= require('./routes/rutasEmpleado');
const routeOrganismo= require('./routes/rutasOrganismo');
const routeTLicitacion= require('./routes/rutasTLicitacion');
const routeDireccion= require('./routes/rutasDireccion');
const routeLegitimoAb=require('./routes/rutasLegitimoAb')

app.use('/proveedor',routeProveedor);
app.use('/empleado',routeEmpleado);
app.use('/organismo',routeOrganismo);
app.use('/tlicitacion',routeTLicitacion);
app.use('/direccion',routeDireccion);
app.use('/legitimoab',routeLegitimoAb);

/*************************************************************************/

app.listen(port,()=>{
    console.log('puerto '+ port);
});
