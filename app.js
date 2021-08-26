
const express= require('express');
const jwt= require('jsonwebtoken');
const unless= require('express-unless');
const bcrypt= require('bcrypt');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {PORT}=require('./config/globals');
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/estatico/mul-upload.html');
})
/***
 * RUTAS:
 * Proveedor (/proveedor)-> empresa o persona física que se inscribe como proveedor del Estado.
 * Empleado (/empleado)-> Empleado de un Organismo del Estado, que esta inscripto en el sistema.
 * Organismo (/organismo)-> Organismo perteneciente al Estado, que esta inscripto en el sistema.
 * tlicitacion (/tlicitacion)-> tipo de licitacion.
 * legitimoAb (/legitimoab)-> ruta para los legitimos abonos.
 * direccion (/direccion)-> direcciones.
 * provincia (/provincia)->provincias del pais. Se solicitara ésta información por ejemplo al ingresar un
 * nuevo proveedor al sistema.
 * localidad (/localidad)->localidades del pais. Se solicitara ésta información por ejemplo al ingresar un
 * nuevo proveedor al sistema.
 */

const routeProveedor= require('./routes/rutasProveedor');
const routeEmpleado= require('./routes/rutasEmpleado');
const routeOrganismo= require('./routes/rutasOrganismo');
const routeTLicitacion= require('./routes/rutasTLicitacion');
const routeDireccion= require('./routes/rutasDireccion');
const routeLegitimoAb=require('./routes/rutasLegitimoAb');
const routeProvincia=require('./routes/rutasProvincia');
const routeLocalidad=require('./routes/rutasLocalidad');

app.use('/proveedor',routeProveedor);
app.use('/empleado',routeEmpleado);
app.use('/organismo',routeOrganismo);
app.use('/tlicitacion',routeTLicitacion);
app.use('/direccion',routeDireccion);
app.use('/legitimoab',routeLegitimoAb);
app.use('/provincia',routeProvincia);
app.use('/localidad',routeLocalidad);

/*************************************************************************/
app.use((req, res) => {
    res.json({"error":"Ruta no encontrada","descripcion": `ruta ${req.originalUrl} no implementada` });
})
app.listen(PORT,()=>{
    console.log('puerto '+ PORT);
});
