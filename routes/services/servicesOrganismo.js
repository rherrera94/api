const model= require ('../models/modelsOrganismo');
// falta borrado logico
/**
 * @returns {JSON} Devuelve un listado general de todos los organismos
 * que hay registrados en la tabla de organismo.
 * En el caso de existir algun error lo devuelve.
 */
async function organismosListado(){
    return await model.organismosList();
}
/**
 * @param {Integer} id id del organismo a buscar
 * @returns {JSON} devuelve un JSON con la información del organismo
 * que tiene número de id igual al que se pasa por parámetro. 
 * En el caso de existir algun error lo devuelve.
 */
async function organismoGetter (id){
    return await model.organismoGet(id);
}
/**
* @param {String} cuit cuit del organismo a buscar.
* @returns {JSON} devuelve un JSON con la información del organismo
* que tiene número de cuit igual al que se pasa por parámetro.
*  En el caso de existir algun error lo devuelve. 
*/
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}

module.exports={
    organismoGetter,
    organismosListado,
    cuitGetter
}