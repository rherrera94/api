const model= require ('../models/modelsDireccion');
/**
 * @returns {JSON} Devuelve la direccion registrada.
 */
 async function guardarDireccion(direccion){
    return await model.guardarDireccion(direccion);
}
/**
 * @returns {JSON} Devuelve un listado general de todas las direcciones
 * que hay registradas en la tabla de direccion.
 */
async function direccionListado(){
    return await model.direccionesList();
}
/**
 * @param {Integer} id id de la direccion a buscar
 * @returns {JSON} devuelve un JSON con la información de la direccion
 * que tiene número de id igual al que se pasa por parámetro. 
 */
async function direccionGetter (id){
    return await model.direccionGet(id);
}
/**
 * @param {Object} direccion direccion a buscar
 * @returns {Integer} devuelve el codigo de la direccion buscada. 
 */
 async function direccionEntGet (direccion){
    return await model.direccionEntGet(direccion);
}

module.exports={
    direccionListado,
    direccionGetter,
    direccionEntGet,
    guardarDireccion
}