const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesTLicitacion')

/**
 * Devuelve un listado generalizado de los tipos de licitación que hay
 * registrados en la tabla tlicitacion.
 * @returns {JSON} json
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
 * @returns {JSON} json
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

/**
 * Borrado logico del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro. Devuleve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */

app.put('/borrado/:id', async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones con ese id.');
        } 

        registros=await servicios.tlicitacionBorrado(req.params.id)
        res.status(200).send(registros);

    } catch (error) {
        if (error.message!='No se han encontrado tipos de licitaciones con ese id.'){
            res.status(400).send({"Mensaje": "error inesperado"});
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

module.exports=app;