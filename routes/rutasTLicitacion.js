const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesTLicitacion')

/**
 * Devuelve un listado generalizado de los tipos de licitación que hay
 * registrados en la tabla tlicitacion.
 * Formato de devolución: JSON
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado tipos de licitaciones.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro.
 * Formato de devolución: JSON
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado tipos de licitaciones con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

module.exports=app;