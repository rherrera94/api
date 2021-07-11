const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesLegitimoAb');
const serviceOrganismo= require('./services/servicesOrganismo');
const serviceProveedor= require('./services/servicesProveedor');
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
        if(isNaN(req.body.proveedor)){
           throw new Error ("En el campo proveedor debe haber un número de cuit"); 
        }
        if(isNaN(req.body.monto)){
            throw new Error ("En el campo monto debe haber un número"); 
        } 
        if(req.body.organismo.trim()==""|| req.body.descripcion.trim()==""||
        req.body.fechaInicio.trim()==""|| req.body.fechaFin.trim()==""||
        req.body.justificacion.trim()==""|| req.body.actodispo.trim()==""){
            throw new Error('No se puede realizar envio de información en blanco.');
        }
        //me fijo si el organismo ingresado existe y si es asi me guardo el id
        let organismo=await serviceOrganismo.denominacionGetter(req.body.organismo.toUpperCase());
        if (organismo.length==0){
            throw new Error ("Organismo inexistente");
        }
        //me fijo si el proveedor ingresado existe y si es asi me guardo el id
        let proveedor=await serviceProveedor.cuitGetter(req.body.proveedor);
        if (proveedor.length==0){
            throw new Error ("Proveedor inexistente");
        }
        //hasta implementar la seccion usuario el id de usuario sera 2
        let legitimoAb={
            "organismo": organismo[0].id,
            "proveedor": proveedor[0].id,
            "descripcion": req.body.descripcion.toUpperCase(),
            "fechaInicio": req.body.fechaInicio,
            "fechaFin": req.body.fechaFin,
            "monto": req.body.monto,
            "justificacion": req.body.justificacion.toUpperCase(),
            "actoDispositivo": req.body.actodispo,
            "idusuario":2
        }
        let registro=await servicios.legitimoAb(legitimoAb);
        if (registro.length==0){
            throw new Error ("El Legitimo abono ha sido ingresado. Error de lectura de la base de datos.");
        }
        res.status(200).send(registro);         
    }
    catch(e){
        if (e.message!="El Legitimo abono ha sido ingresado. Error de lectura de la base de datos." ||
        e.message!="Proveedor inexistente"|| e.message!= "Organismo inexistente"|| 
        e.message!= 'No se puede realizar envio de información en blanco.'|| e.message!= "En el campo monto debe haber un número" ||
        e.message!= "En el campo proveedor debe haber un número de cuit" || e.message!='faltan datos'){
            res.status(404).send({"Mensaje": "Error inesperado. Comuniquese con el administrador"});
        }
        res.status(404).send({"Mensaje": e.message});
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
            res.status(404).send({"Mensaje": "error inesperado"});
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
            res.status(404).send({"Mensaje": "error inesperado"});
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

module.exports=app;