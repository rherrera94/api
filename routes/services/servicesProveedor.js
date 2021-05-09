const model= require ('../models/modelsProveedor');

/**
 * @returns {JSON} Devuelve un listado general de todos los proveedores
 * que hay en la tabla de proveedores. En el caso de existir algun error
 * lo devuelve.
 */
async function proveedoresListado(){
    return await model.proveedoresList();
}

/**
 * @param {Integer} id id del proveedor a buscar
 * @returns {JSON} devuelve un JSON con la información del proveedor
 * que tiene número de id igual al que se pasa por parámetro. En el 
 * caso de existir algun error lo devuelve. 
 */
async function proveedorGetter (id){
    return await model.proveedorGet(id);
}
/**
* @param {String} ciut cuit del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la información del proveedor
* que tiene número de cuit igual al que se pasa por parámetro. En el 
* caso de existir algun error lo devuelve. 
*/
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. 
 * @param {String} ciut cuit del proveedor a buscar.
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. En el caso de existir algun error lo devuelve.
 */
 async function proveedorBorrado(cuit){
    return await model.proveedorBorrado(cuit);
}
module.exports={
    proveedorGetter,
    proveedoresListado,
    cuitGetter,
    proveedorBorrado
}