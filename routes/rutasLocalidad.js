const express= require('express');
const app=express.Router();
const localidades=require('./models/modelsLocalidad');


app.get("/", async (req, res) => {
    try{
        let contenido= await localidades.leer();
        if (contenido.length==0){
            throw new Error('No hay localidades')
        }
        res.status(200).json(contenido);
    }catch(e){
        if (e.message!='no hay localidades'){
            res.status(404).send({"error":"Error inesperado"})
        }
        res.status(404).send ({"error": e.message});
    }
});

app.get('/:id',async (req,res)=>{
    
    try{
        let contenido=await localidades.buscar(req.params.id);
        if (contenido.length==0){
            throw new Error ('localidad no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='localidad no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})
app.get('/nombre/:nombre',async (req,res)=>{
    
    try{
        let contenido=await localidades.buscarNombre(req.params.nombre);
        if (contenido.length==0){
            throw new Error ('localidad no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='localidad no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})

module.exports=app;