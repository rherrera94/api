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
 * @returns {JSON} Devuelve el resultado de la consulta generalizada
 * a la tabla tlicitacion.  
 */
async function tlicitacionesList(){
    let registros=await qy ('SELECT * FROM tLicitacion');
    return registros;
}
/**
 * @param {Integer} id id del tipo de licitación
 * @returns {JSON} devuelve los registros de la tabla tLicitacion donde el id
 * es igual al que se pase por parámetros. 
 */
async function tlicitacionGet (id){
    let query='SELECT * FROM tLicitacion WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}

/**
 * @param {string} licitacion nombre del tipo de licitación
 * @returns {JSON} devuelve los registros de la tabla tLicitacion donde el nombre
 * es igual al que se pase por parámetros. 
 */
 async function tlicitacionNGet (licitacion){
    let query='SELECT * FROM tLicitacion WHERE nombre=?';
    let registros=await qy (query,licitacion);
    return registros;
}

/**
 * @param {string} licitacion nombre del tipo de licitación 
 */
 async function tlicitacion (licitacion){
    let query='INSERT INTO tlicitacion (nombre) value (?)';
    await qy (query,licitacion);
}

/**
 * Borrado logico del tipo de licitacion que tiene número de id igual al 
 * que se pasa por parámetro. 
 * @param {String} id id del tipo de licitacion que se desea borrar.
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. En el caso de existir algun error lo devuelve.
 */
async function tlicitacionBorrado(id){
    let query = 'UPDATE tLicitacion SET eliminado=? WHERE id = ?';
    await qy(query, [1, id]);
    return await tlicitacionGet(id);
}

module.exports={
    tlicitacionGet,
    tlicitacionNGet,
    tlicitacionesList,
    tlicitacion,
    tlicitacionBorrado
}