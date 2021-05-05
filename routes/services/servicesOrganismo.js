const model= require ('../models/modelsOrganismo');

async function organismosListado(){
    return await model.organismosList();
}

async function organismoGetter (id){
    return await model.organismoGet(id);
}

async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}

module.exports={
    organismoGetter,
    organismosListado,
    cuitGetter
}