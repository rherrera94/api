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
 * direccion en busca de un listado generalizado todas las direcciones
 * registradas.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla direccion.
 * En el caso de existir algun error lo devuelve.
 */
async function direccionesList(){
    let registros=await qy ('SELECT * FROM direccion');
    return registros;

}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de la direccion con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id de la dirección a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla direccion.
 * En el caso de existir algun error lo devuelve. 
 */
async function direccionGet (id){
    let query='SELECT * FROM direccion WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}

module.exports={
    direccionGet,
    direccionesList
}