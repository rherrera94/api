const model= require ('../models/modelsOrganismo');

/**
 * guarda el organismo que se pasa por parametros
 * @param {Object} organismo recibe un objeto que contendra el organismo.
 */
 async function guardarOrganismo(organismo){
    return await model.guardarOrganismo();
}
/**
 * @returns {JSON} Devuelve un listado general de todos los organismos
 * que hay registrados en la tabla de organismo.
 */
async function organismosListado(){
    return await model.organismosList();
}
/**
 * @param {Integer} id id del organismo a buscar
 * @returns {JSON} devuelve un JSON con la información del organismo
 * que tiene número de id igual al que se pasa por parámetro.
 */
async function organismoGetter (id){
    return await model.organismoGet(id);
}
/**
* @param {String} cuit cuit del organismo a buscar.
* @returns {JSON} devuelve un JSON con la información del organismo
* que tiene número de cuit igual al que se pasa por parámetro. 
*/
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}
//FALTA PROBAR
async function denominacionGetter(denominacion){
    return await model.denominacionGet(denominacion);
}
module.exports={
    organismoGetter,
    organismosListado,
    cuitGetter,
    denominacionGetter,
    guardarOrganismo
}