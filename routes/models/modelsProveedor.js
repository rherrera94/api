require('dotenv').config({ path:'../../.env'});
/********************CONEXIÓN A BASE DE DATOS*************************/
/*   Se utilizan variables de entorno para ocultar datos sensibles.  */
/*********************************************************************/
var mysql=require('mysql');
const util=require ('util'); // no se necesita instalarla

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
 * proveedor en busca de un listado generalizado todos los proveedores
 * registrados.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla proveedor.
 * En el caso de existir algun error lo devuelve.
 */
async function proveedoresList(){
    let registros=await qy ('SELECT * FROM proveedor');
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * proveedor en busca de del proveedor con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id del proveedor a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla proveedor.
 * En el caso de existir algun error lo devuelve. 
 */
async function proveedorGet (id){
    let query='SELECT * FROM proveedor WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* proveedor en busca de del proveedor con numero de cuit que se pasa
* por parámetro. 
* @param {String} ciut cuit del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla proveedor.  
* En el caso de existir algun error lo devuelve. 
*/
async function cuitGet (cuit){
    let query='SELECT * FROM proveedor WHERE cuit=?';
    let registros=await qy (query,cuit);
    return registros;
}
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. 
 * @param {String} ciut cuit del proveedor a buscar.
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. En el caso de existir algun error lo devuelve.
 */
async function proveedorBorrado(cuit){
    let query = 'UPDATE proveedor SET eliminado=? WHERE cuit = ?';
    await qy(query, [1, cuit]);
    return cuitGet(cuit);
}
module.exports={
    proveedorGet,
    proveedoresList,
    cuitGet,
    proveedorBorrado
}