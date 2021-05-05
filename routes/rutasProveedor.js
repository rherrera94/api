const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesProveedor')

app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.proveedoresListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Proveedores.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Proveedores.'){
            res.status(413).send({"Mensaje":'error inesperado'}); 
            return;   
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.proveedorGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado proveedores con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado proveedores con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

app.get('/cuit/:cuit',async (req,res)=>{
    try{
        let registros=await servicios.cuitGetter(req.params.cuit);
        if (registros.length==0){
            throw new Error ('No se han encontrado proveedores con ese cuit.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado proveedores con ese cuit.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
module.exports=app;