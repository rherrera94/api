const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesOrganismo')
const servicesDireccion=require('./services/servicesDireccion')
/**
 * Devuelve un listado generalizado con todos los organismo existentes en la 
 * base de datos.
 * @returns {JSON} json
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
 * @returns {JSON} json
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
 * @returns {JSON} json
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
/**
 * Devuelve la información del organismo que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
 app.get('/denominacion/:denominacion',async (req,res)=>{
    try{
        let registros=await servicios.denominacionGetter(req.params.denominacion);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con esa denominación.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con esa denominación.'){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/*******************************************************************************/

module.exports=app;