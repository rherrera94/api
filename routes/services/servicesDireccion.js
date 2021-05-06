const model= require ('../models/modelsDireccion');
/**
 * Devuelve un listado generalizado de las direcciones que hay
 * registrados en la tabla direccion.
 * Formato de devolución: JSON
 */
async function direccionListado(){
    return await model.direccionesList();
}
/**
 * Devuelve la información de la direccion que tiene número de id igual al 
 * que se pasa por parámetro.
 * Formato de devolución: JSON
 */
async function direccionGetter (id){
    return await model.direccionGet(id);
}

module.exports={
    direccionListado,
    direccionGetter
}