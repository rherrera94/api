const model= require ('../models/modelsLegitimoAb');

/**
 * @returns {JSON} Devuelve un JSON con un listado generalizado de
 * los Legitimos abonos registrados en la BBDD.
 * En el caso de existir algun error lo devuelve.  
 */
async function legitimoAbListado(){
    return await model.legitimoAbList();
}

/**
 * @param {Integer} id id del legitimo abono
 * @returns {JSON} devuelve un JSON con la información del legitimo 
 * abono que tiene número de id igual al que se pasa por parámetro.
 * En el caso de existir algun error lo devuelve. 
 */
async function legitimoAbGetter (id){
    return await model.legitimoAb(id);
}
/**
 * @param {integer} organismo id del organismo que se desea buscar
 * @returns {JSON} devuelve un JSON con la información de los legitimos 
 * abonos que tiene idOrganismo igual al que se pasa por parámetro.
 * En el caso de existir algun error lo devuelve. 
 */
 async function legitimoAbGetterIo (organismo){
    return await model.legitimoAbIoGet(organismo);
}
/**
 * @param {integer} proveedor id del proveedor que se desea buscar
 * @returns {JSON} devuelve un JSON con la información de los legitimos 
 * abonos que tiene idProveedor igual al que se pasa por parámetro.
 * En el caso de existir algun error lo devuelve. 
 */
 async function legitimoAbGetterIp (proveedor){
    return await model.legitimoAbIpGet(proveedor);
}

/**
 * Borrado logico del legitimo abono que tiene número de id igual al 
 * que se pasa por parámetro. 
 * @param {Integer} id id del legitimo abono
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. En el caso de existir algun error lo devuelve.
 */
async function legitimoAbBorrado(id){
    return await model.legitimoAbBorrado(id);
}

module.exports={
    legitimoAbListado,
    legitimoAbGetter,
    legitimoAbGetterIo,
    legitimoAbGetterIp,
    legitimoAbBorrado
}