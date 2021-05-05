const model= require ('../models/modelsTLicitacion');

async function tlicitacionListado(){
    return await model.tlicitacionesList();
}

async function tlicitacionGetter (id){
    return await model.tlicitacionGet(id);
}

module.exports={
    tlicitacionListado,
    tlicitacionGetter
}