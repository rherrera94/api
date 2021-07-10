const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesLegitimoAb')

/**
 * Crea un nuevo legitimo abono. Recibira por el body los datos 
 * del nuevo legitimo abono que se agregara a la base de datos.
 * En caso de que la peticion haya salido bien devolverá status 200 y
 * un json con el nuevo legitimo abono. De existir algún error lo
 * devolverá con Status 404.
 * @returns {JSON} json
 */

app.post ('/',async (req, res)=> {
    try{
        if (!req.body.organismo ||!req.body.proveedor || !req.body.descripcion || 
            !req.body.fechaInicio || !req.body.fechaFin || !req.body.monto || 
            !req.body.justificacion ||!req.body.actodispo){
            throw new Error('faltan datos');
        }
        if(req.body.organismo.trim()==""|| req.body.proveedor.trim()==""|| req.body.descripcion.trim()==""||
        req.body.fechaInicio.trim()==""|| req.body.fechaFin.trim()==""|| req.body.monto.trim()==""||
        req.body.justificacion.trim()==""|| req.body.actodispo.trim()==""){
            throw new Error('No se puede realizar envio de información en blanco');
        }
        let organismo=req.body.organismo.toUpperCase();
        let proveedor=req.body.proveedor.toUpperCase();
        let descripcion= req.body.descripcion.toUpperCase();
        let justificacion= req.body.justificacion.toUpperCase(); 
    }
    catch(e){
        
    }
 })

/**
 * Devuelve un listado generalizado de los legitimos abono que hay
 * registrados en la base de datos.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        
    }
    catch(error){
        
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del legitimo abono que tiene número de id igual al 
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
 * Borrado logico del legitimo abono que tiene número de id igual al 
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