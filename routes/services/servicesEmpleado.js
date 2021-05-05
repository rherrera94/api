const model= require ('../models/modelsEmpleado');

async function empleadosListado(){
    return await model.empleadosList();
}

async function empleadoGetter (id){
    return await model.empleadoGet(id);
}

async function cuilGetter (cuil){
    return await model.cuilGet(cuil);
}

module.exports={
    empleadoGetter,
    empleadosListado,
    cuilGetter
}