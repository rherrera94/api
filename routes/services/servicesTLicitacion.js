const model= require ('../models/modelsTLicitacion');

/**
 * @returns {JSON} Devuelve un JSON con un listado generalizado de
 * los tipos de licitación que hay registrados en la tabla tlicitacion.
 * En el caso de existir algun error lo devuelve.  
 */
async function tlicitacionListado(){
    return await model.tlicitacionesList();
}

/**
 * @param {Integer} id id del tipo de licitación
 * @returns {JSON} devuelve un JSON con la información del tipo de 
 * licitación que tiene número de id igual al que se pasa por parámetro.
 * En el caso de existir algun error lo devuelve. 
 */
async function tlicitacionGetter (id){
    return await model.tlicitacionGet(id);
}
/**
 * Borrado logico del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro. 
 * @param {Integer} id id del tipo de licitación
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. En el caso de existir algun error lo devuelve.
 */
async function tlicitacionBorrado(id){
    return await model.tlicitacionBorrado(id);
}

module.exports={
    tlicitacionListado,
    tlicitacionGetter,
    tlicitacionBorrado
}