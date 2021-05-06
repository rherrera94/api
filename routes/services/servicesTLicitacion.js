const model= require ('../models/modelsTLicitacion');
/**
 * Devuelve un listado generalizado de los tipos de licitación que hay
 * registrados en la tabla tlicitacion.
 */
async function tlicitacionListado(){
    return await model.tlicitacionesList();
}
/**
 * Devuelve la información del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro.
 */
async function tlicitacionGetter (id){
    return await model.tlicitacionGet(id);
}
/**
 * Borrado logico del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro. Devuleve el registro con el campo eliminado en 1.
 * Formato de devolución: JSON
 */
async function tlicitacionBorrado(id){
    return await model.tlicitacionBorrado(id);
}

module.exports={
    tlicitacionListado,
    tlicitacionGetter,
    tlicitacionBorrado
}