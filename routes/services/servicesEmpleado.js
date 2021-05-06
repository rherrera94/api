const model= require ('../models/modelsEmpleado');
/**
 * Devuelve un listado general de todo los empleados que hay registrados 
 * en la tabla de empleados con toda su información.
 */
async function empleadosListado(){
    return await model.empleadosList();
}
/**
 * Devuelve la información del empleado que tiene número de id igual al que se 
 * pasa por parámetro.
 */
async function empleadoGetter (id){
    return await model.empleadoGet(id);
}

/**
 * Devuelve la información del empleado que tiene número de cuil igual al que se 
 * pasa por parámetro.
 */
async function cuilGetter (cuil){
    return await model.cuilGet(cuil);
}

module.exports={
    empleadoGetter,
    empleadosListado,
    cuilGetter
}