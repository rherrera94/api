const express= require('express');
const app=express.Router();
const provincias=require('./models/modelsProvincia');


app.get("/", async (req, res) => {
    try{
        let contenido= await provincias.leer();
        if (contenido.length==0){
            throw new Error('No hay provincias')
        }
        res.status(200).json(contenido);
    }catch(e){
        if (e.message!='no hay provincias'){
            res.status(404).send({"error":"Error inesperado"})
        }
        res.status(404).send ({"error": e.message});
    }
});

app.get('/:id',async (req,res)=>{
    
    try{
        let contenido=await provincias.buscar(req.params.id);
        if (contenido.length==0){
            throw new Error ('provincia no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='provincia no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})
app.get('/nombre/:nombre',async (req,res)=>{
    
    try{
        let contenido=await provincias.buscarNombre(req.params.nombre);
        if (contenido.length==0){
            throw new Error ('provincia no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='provincia no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})

module.exports=app;