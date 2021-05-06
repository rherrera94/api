const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesProveedor')

/**
 * Devuelve un listado general de todos los proveedores que hay en la tabla de 
 * proveedores.
 * Formato de devolución: JSON
 */
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
/**
 * Devuelve la información del proveedor que tiene número de id igual al que se 
 * pasa por parámetro.
 * Formato de devolución: JSON
 */
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
/**
 * Devuelve la información del proveedor que tiene número de cuit igual al que se 
 * pasa por parámetro.
 * Formato de devolución: JSON
 */
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
/**
 * Borrado logico del proveedor que tiene número de id igual al 
 * que se pasa por parámetro. Devuelve el registro con el campo eliminado en 1.
 * Formato de devolución: JSON
 */

 app.put('/borrado/:id', async (req,res)=>{
    try{
        let registros=await servicios.proveedorGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado proveedores con ese id.');
        } 

        registros=await servicios.proveedorBorrado(req.params.id)
        res.status(200).send(registros);

    } catch (error) {
        if (error.message!='No se han encontrado proveedores con ese id.'){
            res.status(400).send({"Mensaje": "error inesperado"});
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

module.exports=app;