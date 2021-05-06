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
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. Devuelve el registro con el campo eliminado en 1.
 * Formato de devolución: JSON
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