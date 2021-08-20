const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesOrganismo')
const servicesDireccion=require('./services/servicesDireccion')
/**
 * Crea un nuevo Organismo. Recibira por el body los datos 
 * del nuevo organismo que se agregara a la base de datos.
 * En caso de que la peticion haya salido bien devolverá status 200 y
 * un json con el nuevo Organismo. De existir algún error lo
 * devolverá con Status 404. 
 * @returns {JSON} json
 */
app.post('/prueba',async(req,res)=>{
    try{
        let piso=0;
        let depto=0;
        if(!req.body.piso){piso=null}else{piso=req.body.piso};
        if(!req.body.depto){depto=null}else{depto=req.body.depto};
    
        let direccionCampo={
            "direccion": req.body.direccion,
            "altura": req.body.altura,
            "piso": piso,
            "depto":depto,
            "codPos":req.body.codPos,
            "provincia":req.body.provincia,
            "localidad":req.body.localidad
        }
        let dire=await servicesDireccion.guardarDireccion(direccionCampo);
        console.log(dire)
        res.send(dire);
    }catch(e){
        console.log(e.message)
    }
        
})
 app.post ('/',async (req, res)=> {
    try{
        // la provincia y la localidad vendran como codigos de provincia y localidad desde el front
        if (!req.body.cuit ||!req.body.denominacion || !req.body.direccion ||!req.body.altura ||
            !req.body.piso || !req.body.depto || !req.body.codigoPostal || !req.body.provincia || 
            !req.body.localidad || !req.body.telefono || !req.body.mail){
            //si falta algun dato lanza un error
            throw new Error('faltan datos');
        }
        
        if(isNaN(req.body.cuit)){
            //si se inserto algo diferente de un numero lanza error
            throw new Error ("En el campo cuit debe haber un número de cuit"); 
        }
        if(isNaN(req.body.altura)){
            //si se inserto algo diferente de un numero lanza error
            throw new Error ("En el campo altura debe haber un número"); 
        } 
        if(isNaN(req.body.codigoPostal)){
            //si se inserto algo diferente de un numero lanza error
            throw new Error ("En el campo codigo postal debe haber un número"); 
        } 
        if(req.body.denominacion.trim()==""|| req.body.direccion.trim()==""||
        req.body.mail.trim()==""){
            //nos fijamos que no hayan ingresado algun campo con espacios en blanco
            throw new Error('No se puede realizar envio de información en blanco.');
        }
        let piso=0;
        let depto=0;
        if(!req.body.piso){piso=null}else{piso=req.body.piso};
        if(!req.body.depto){depto=null}else{depto=req.body.depto};
    
        let direccionCampo={
            "direccion": req.body.direccion,
            "altura": req.body.altura,
            "piso": piso,
            "depto":depto,
            "codPos":req.body.codPos,
            "provincia":req.body.provincia,
            "localidad":req.body.localidad
        }
        let dire=await servicesDireccion.direccionEntGet(direccionCampo);
        if (dire.length==0){
            dire= await servicesDireccion.guardarDireccion(direccionCampo);
        }
        if (dire.length==0){
            throw new Error ("Error al procesar la dirección establecida");
        }
        let organismo={
            "cuit": req.body.cuit,
            "denominacion": req.body.denominacion,
            "direccion": dire[0].id,
            "telefono": req.body.telefono,
            "mail":req.body.mail
        }
        await servicios.guardarOrganismo(organismo)
        res.status(200).send(organismo);         
    }
    catch(e){
        //console.log(e);
        if (e.message!="Error al procesar la dirección establecida"&& e.message!='No se puede realizar envio de información en blanco.'){
            //en el caso de que el error sea uno desconocido lanzo error inesperado.
            res.status(404).send({"Mensaje": "Error inesperado. Comuniquese con el administrador"});
            return;
        }
        res.status(404).send({"Mensaje": e.message});
    }
 })

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