const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesUserInterno');
const servicesEmpleado=require('./services/servicesEmpleado');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const{SECRET_WORD}=require('../config/globals');

/**
 * Agrega un nuevo Usuario a la tabla usuariosInternos.
 * @returns {JSON} json que contiene el nuevo Usuario agregado.
 */
app.post('/',async(req,res)=>{
    try{
        //controla que todos los campos necesarios vengan sin estar vacios
        if(!req.body.cuil||!isNaN(req.body.cuil)||req.body.cuil.trim()==""||
        !req.body.usuario||!isNaN(req.body.usuario)||req.body.usuario.trim()==""||
        !req.body.contrasenia||!isNaN(req.body.contrasenia)||req.body.contrasenia.trim()==""||
        !req.body.email||!isNaN(req.body.email)||req.body.email.trim()==""||
        !req.body.rol||isNaN(req.body.rol)){
            throw new Error("Revise la información ingresada");
        }
        //me fijo si el nombre de usuario ya se encuentra registrado
        let buscarxusuario=await servicios.getUser(req.body.usuario);
        if (buscarxusuario.length!=0){
            throw new Error("El nombre de usuario ya se encuentra registrado");
        }
        //me fijo si el empleado esta en los registros
        let empleado=await servicesEmpleado.cuilGetter(req.body.cuil);
        if (empleado.length==0){
            throw new Error("El numero de cuil ingresado no se corresponde con empleado registrado");
        }
        //Si está todo bien, debemos encriptar la clave
		const claveEncriptada= await bcrypt.hash(req.body.contrasenia,10);
        //por el momento y hasta que se implemente rutasRol se toma como que el id de rol me lo pasa el front
        let usuarioReg={
            "nombre":req.body.usuario.toUpperCase(),
            "contrasenia":claveEncriptada,
            "idRol":req.body.rol,
            "idEmpleado":empleado[0].id,
            "mail":req.body.email.toUpperCase()
        }
        await servicios.createUser(usuarioReg);
        res.json(usuarioReg);
    }catch(e){

        if(e.message!="Revise la información ingresada" && e.message!="El nombre de usuario ya se encuentra registrado"
        && e.message!="El numero de cuil ingresado no se corresponde con empleado registrado"){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
    }
})
/**
 * Login. De haber ingresado correctamente el usuario y la contraseña devuelve un token
 * @returns{JSON} DEVUELVE EL TOKEN.
 */
app.post('/login', async(req,res)=>{
	try{
	    if(!req.body.usuario || !req.body.contrasenia){
		    throw new Error ("Revise los datos ingresados");
	    }
        let respuesta=await servicios.getUser(req.body.usuario.toUpperCase());
        if (respuesta.length==0){
            throw new Error ('Usuario o contraseña incorrectos');
        }
        if(!bcrypt.compareSync (req.body.contrasenia, respuesta[0].contrasenia)){
		    throw new Error("Usuario o contraseña incorrectos");
	    }
        let d=new Date();
        let fech=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"Z";
	    const tokenData={
		    idusuario: respuesta[0].id, 
		    nombreusuario:respuesta[0].nombre,
            fechalogueo:fech,
		    email:respuesta[0].mail
	    }
	   const token= jwt.sign(tokenData, SECRET_WORD,{
		expiresIn: 60*60*2 // expira en 2hs
	   });
       let permisos=await servicios.getPermisos(respuesta[0].idRol)
       //armo la parte del rol donde tendre que id de rol es y ademas los permisos que tiene el rol
       let rol={
           "id":respuesta[0].idRol,
           "role_permits":permisos
        };
        //armo la informacion que le voy a devolver al front para que se pueda armar los menu etc
       let jsonrta={
           "id":respuesta[0].id,
           "email":respuesta[0].mail,
           "username":respuesta[0].nombre,
           "role_id":respuesta[0].idRol,
           "role":rol
       }
	   res.send({"data":jsonrta,"token":token});					
	}
	catch(e){
        console.log(e)
        if(e.message!="Revise los datos ingresados" && e.message!='Usuario o contraseña incorrectos'){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
	}
});
module.exports=app;