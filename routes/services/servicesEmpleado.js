const model= require ('../models/modelsEmpleado');
/**
 * @returns {JSON} Devuelve un listado general de todos los empleado
 * que hay registrados en la tabla de empleado.
 * En el caso de existir algun error lo devuelve.
 */
async function empleadosListado(){
    return await model.empleadosList();
}
/**
 * @param {Integer} id id del empleado a buscar
 * @returns {JSON} devuelve un JSON con la información del empleado
 * que tiene número de id igual al que se pasa por parámetro.
 * En el caso de existir algun error lo devuelve. 
 */
async function empleadoGetter (id){
    return await model.empleadoGet(id);
}

/**
* @param {String} cuil cuil del empleado a buscar.
* @returns {JSON} devuelve un JSON con la información del empleado
* que tiene número de cuil igual al que se pasa por parámetro.
* En el caso de existir algun error lo devuelve.
*/
async function cuilGetter (cuil){
    return await model.cuilGet(cuil);
}

module.exports={
    empleadoGetter,
    empleadosListado,
    cuilGetter
}