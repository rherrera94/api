require('dotenv').config({ path:'../../.env'});
/********************CONEXIÓN A BASE DE DATOS*************************/
/*   Se utilizan variables de entorno para ocultar datos sensibles.  */
/*********************************************************************/
var mysql=require('mysql');
const util=require ('util');
var conexion= mysql.createConnection({
    host: process.env.APP_HOST,
    user: process.env.APP_USER,
    password:process.env.APP_KEY,
    database:process.env.APP_DB
});
conexion.connect((error)=>{
    if(error){
        console.log("Error en la conexion a la Base de datos");
        return;
    }
});
const qy= util.promisify(conexion.query).bind(conexion); //permitira el uso de async-await en la conexion mysql
/*********************************************************************/
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * organismo en busca de un listado generalizado todos los organismos
 * registrados.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla organismo.
 * En el caso de existir algun error lo devuelve.
 */
async function organismosList(){
    let registros=await qy ('SELECT * FROM organismo');
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * organismo en busca del organismo con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id del organismo a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla organismo.
 * En el caso de existir algun error lo devuelve. 
 */
async function organismoGet (id){
    let query='SELECT * FROM organismo WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* organismo en busca del organismo con numero de cuit que se pasa
* por parámetro. 
* @param {String} ciut cuit del organismo a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla organismo.  
* En el caso de existir algun error lo devuelve. 
*/
async function cuitGet (cuit){
    let query='SELECT * FROM organismo WHERE cuit=?';
    let registros=await qy (query,cuit);
    return registros;
}

//FALTA TESTEAR
async function denominacionGet(denominacion){
    let query='SELECT * FROM organismo WHERE denominacion=?';
    let registros=await qy (query,denominacion);
    return registros;
}
module.exports={
    organismoGet,
    organismosList,
    cuitGet,
    denominacionGet
}