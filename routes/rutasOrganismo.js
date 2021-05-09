const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesOrganismo')

//falta el borrado logico
/**
 * Devuelve un listado generalizado con todos los organismo existentes en la 
 * base de datos.
 * Formato de devolución: JSON
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.organismosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Organismos.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Organismos.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del organismo que tiene número de id igual al que se 
 * pasa por parámetro.
 * Formato de devolución: JSON
 */
app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.organismoGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del organismo que tiene número de cuit igual al que se 
 * pasa por parámetro.
 * Formato de devolución: JSON
 */
app.get('/cuit/:cuit',async (req,res)=>{
    try{
        let registros=await servicios.cuitGetter(req.params.cuit);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con ese cuit.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con ese cuit.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

module.exports=app;