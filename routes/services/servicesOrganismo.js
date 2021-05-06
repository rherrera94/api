const model= require ('../models/modelsOrganismo');
/**
 * Devuelve un listado generalizado con todos los organismo existentes en la 
 * base de datos
 */
async function organismosListado(){
    return await model.organismosList();
}
/**
 * Devuelve la información del organismo que tiene número de id igual al que se 
 * pasa por parámetro.
 */
async function organismoGetter (id){
    return await model.organismoGet(id);
}
/**
 * Devuelve la información del organismo que tiene número de cuit igual al que se 
 * pasa por parámetro.
 */
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}

module.exports={
    organismoGetter,
    organismosListado,
    cuitGetter
}