const model= require ('../models/modelsProveedor');

async function proveedoresListado(){
   
    return await model.proveedoresList();
}

async function proveedorGetter (id){
    return await model.proveedorGet(id);
}

async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}

module.exports={
    proveedorGetter,
    proveedoresListado,
    cuitGetter
}