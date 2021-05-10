const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesEmpleado')

/**
 * Devuelve un listado general de todo los empleados que hay registrados 
 * en la tabla de empleados con toda su información.
 * @returns {JSON} json
 */

app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.empleadosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Empleados.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Empleados.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.empleadoGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de cuil igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/cuil/:cuil',async (req,res)=>{
    try{
        
        let registros=await servicios.cuilGetter(req.params.cuil);
        
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese cuil.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese cuil.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

module.exports=app;