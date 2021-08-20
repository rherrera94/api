const qy=require('../../config/conexion');
/*********************************************************************/
/**
 * Guarda en la base de datos, especificamente a la tabla
 * organismo el organismo que se pasa por parametros.
 */
 async function guardarOrganismo(organismo){
    let query='INSERT INTO organismo (cuit,denominacion,direccion,telefono,mail) values (?,?,?,?,?)';
    await qy (query,[organismo.cuit,organismo.denominacion,organismo.direccion,organismo.telefono,organismo.mail]);    
}

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
    guardarOrganismo,
    organismoGet,
    organismosList,
    cuitGet,
    denominacionGet
}