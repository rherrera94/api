const model= require ('../models/modelsProveedor');
/**
 * Devuelve un listado general de todos los proveedores que hay en la tabla de 
 * proveedores.
 */
async function proveedoresListado(){
   
    return await model.proveedoresList();
}
/**
 * Devuelve la información del proveedor que tiene número de id igual al que se 
 * pasa por parámetro.
 */
async function proveedorGetter (id){
    return await model.proveedorGet(id);
}
/**
 * Devuelve la información del proveedor que tiene número de cuit igual al que se 
 * pasa por parámetro.
 */
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}

module.exports={
    proveedorGetter,
    proveedoresListado,
    cuitGetter
}