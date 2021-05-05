const express= require('express');
const util= require ('util'); // no se necesita instalarla
const app= express();
const cors= require('cors');
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/********************CONEXIÓN A BASE DE DATOS*************************/
/*  								     */
/*********************************************************************/

var mysql=require('mysql');
var conexion= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'biblioteca'
});

conexion.connect((error)=>{
    
    if(error){
        
        console.log("Error en la conexion a la Base de datos");
        return;

    }

});
    
const qy= util.promisify(conexion.query).bind(conexion); //permitira el uso de async-await en la conexion mysql

/*********************************************************************/
/**
 *  PERSONA
 *  POST /persona-> agrega una nueva persona
 *  GET /persona-> devuelve el listado de personas almacenadas
 *  GET /persona/:id-> devuelve una persona que posee ese número de id
 *  PUT /persona/:id-> actualiza la información de la persona que posee ese número de id
 *  DELETE /persona/:id-> borra la persona con ese id
 */

app.post ('/persona',async (req, res)=> {
   
    
        try{
            if (!req.body.nombre|| !req.body.apellido||!req.body.alias|| !req.body.email ){
                throw new Error('faltan datos');
            }

            let datos= [req.body.nombre.toUpperCase(), req.body.apellido.toUpperCase(), req.body.alias.toUpperCase(), req.body.email.toUpperCase()] ;
    
            if (datos[0].trim()==""|| datos[1].trim()==""||datos[2].trim()==""|| datos[3].trim()=="" ){
                throw new Error('No se pueden enviar datos en blanco');
            }
            
            let revisionUsuario= await qy ( 'SELECT * FROM persona WHERE email=?', datos[3] );

            if (revisionUsuario.length!=0){
                throw new Error("el email ya se encuentra registrado");
            }
            let reg_usuario= await qy ('INSERT INTO persona (nombre, apellido,alias,email) value (?,?,?,?)', datos );
    
            reg_usuario= await qy ( 'SELECT * FROM persona WHERE email=?', datos[3] );
            res.status(200).send (reg_usuario);
    
        }
        catch(error){
            res.status (413).send ({"error": error.message});
        }

});

/*********************************************************************/
    
app.get('/persona',async (req,res)=>{
    try{
        let reg_usuario= await qy ('SELECT * FROM persona');
            
        if(reg_usuario.length==0){
             
            throw new Error ('no hay usuarios registrados')

        }

        res.status(200).send(reg_usuario);   
    }

    catch(error){
        res.status (413).send({"error": error.message});
    }
    
});
    
/**********************************************************************/
app.put('/persona/:id', async (req,res)=>{
    try{
        if(!req.body.nombre, !req.body.apellido, !req.body.alias){
            throw new Error('faltan llenar campos obligatorios');
        }
        
        let nombre= req.body.nombre.toUpperCase();
        let apellido= req.body.apellido.toUpperCase();
        let alias= req.body.alias.toUpperCase();
        
      let query = 'SELECT * FROM persona WHERE id = ?';     
      let respuesta = await  qy(query, [ req.params.id]);

      if(respuesta.length == 0){
          throw new Error('La persona no existe en la base de datos');
      }  
      if(req.body.email!=undefined){
        if (isNaN(req.body.email)==false){
            throw new Error ("El email no puede ser modificado");
        }
          if (req.body.email.toUpperCase()!=respuesta[0].email){
              throw new Error ("El email no puede ser modificado");
          }
      }
      query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ? WHERE id = ?';

      respuesta = await qy(query, [nombre, apellido, alias, req.params.id]);
      query = 'SELECT * FROM persona WHERE id = ?';     
      respuesta = await  qy(query, [ req.params.id]); 
      res.status(200).send(respuesta);

    } catch (error) {
        res.status (413).send({"error": error.message});
    }

});

/***********************************************GET Persona por ID*********************************************************/

app.get("/persona/:id", async (req, res) => {
    
    let rpid = [req.params.id];

    try {
        let consultaPorId="SELECT * FROM persona WHERE id=?";
        let queryResult = await qy(consultaPorId, rpid);

        //Chequea que el resultado no sea vacio
        if (queryResult.length == 0) {
            throw new Error("No se encuentra esa persona");
        }

        res.status(200).send(queryResult[0]);
    }
    catch (error) {
        res.status (413).send({"error": error.message});
    }
});
/**************************************************************************************************************/
app.delete('/persona/:id', async(req, res)=>{

    try{
        let rpid = [req.params.id];
        let consultaSeleccionar="SELECT * FROM persona WHERE id=?";
        let queryPersona = await qy(consultaSeleccionar, rpid);

        //Chequea que el resultado no sea vacio
        if (queryPersona.length == 0) {
            throw new Error('No se encuentra esa persona');
        }

        let query = 'SELECT * FROM libro WHERE persona_id = ?';

        let respuesta = await qy(query, rpid);

        if(respuesta.length > 0){
           throw new Error('La persona no se puede eliminar, tiene libros asociados');
        }

        query = 'DELETE FROM persona WHERE id = ?';

        respuesta = await qy(query, rpid);

        res.status(200).send('Se borró correctamente');


    } 
    catch (error) {
        res.status(413).send({ "error": error.message });
        
    }

});

 /*********************************************************************/
 /*********************************************************************/

 /**
 * LIBRO
 * POST /libro -> Registra un nuevo libro
 * GET /libro -> devuelve todos los libros registrados
 * GET /libro/:id -> devuelve el libro con el id indicado
 * PUT /libro/prestar/:id-> si el libro no esta prestado registra a quien se lo presta
 * PUT /libro/devolver/:id-> Si el libro estaba prestado se registra la devolución
 * PUT /libro/:id->permite modificar la descripcion del libro
 * DELETE /libro/:id -> borra el libro que se desea segun su id
 */

 // INGRESAR LOS LIBROS

           

 app.post("/libro", async (req,res)=>{

    /* Defino variables para no repetir codigo*/
        var nombre = req.body.nombre;
        var categoria = req.body.categoria;
        var descripcion = req.body.descripcion;
        var person_id=req.body.persona_id;
    
    try{
        //Compruebo que se ingrese la categoria y el nombre del libro
        if(!nombre || !categoria || !descripcion){ 
            throw new Error("La categoria, la descripción y el nombre son campos obligatorios ");
        }
        //Transformo los valores a mayusculas
        nombre = nombre.toUpperCase();     
        descripcion = descripcion.toUpperCase();
        categoria = categoria.toUpperCase();
        /* Compruebo que no se manden espacios vacios */
        if (nombre.trim() == "" || categoria.trim()=="" || descripcion.trim()==""){
            throw new Error ("Los campos no pueden estar vacios");
        }
         //llamo a los libros de la BD que contengan el mismo nombre/
        let registro = await qy("SELECT * FROM libro WHERE nombre=? ",[nombre]);

         //Si el tamaño de registro es distinto de 0 el libro ingresado ya existe
        if (registro.length !=0){      
            throw new Error ("El libro ya existe");
        }
        // reviso que haya mandado alguna id de persona, si no quiere poner que se presto el libro hay que poner 0
        if(isNaN(person_id)==true){
            throw new Error("el id de la persona debe ser un número, si no necesita prestarlo en este momento, en la id de persona ingrese 0. ");
        } 
        
        let consultacateg= "select * from genero where nombre=?";
        let resultadoCateg= await qy(consultacateg,[categoria]);
        
        if (resultadoCateg.length==0){
            throw new Error("La categoria no existe");
        }
        
        
        categoria=resultadoCateg[0].id;

        if(descripcion.trim()==""|| descripcion==null){
            descripcion=null;
        }
        
        if(person_id==null  || person_id==0){
            person_id=null;
        }
        
        if (person_id!=null){
            
            let consultaPersona= "select * from persona where id=?";
            let respuestaPersona=await qy(consultaPersona,[person_id]);
            
            if (respuestaPersona.length==0) throw new Error("la persona no existe");
        }
        
        //Guardamos el libro en la base de datos
        registro = await qy("INSERT INTO libro(nombre,descripcion,categoria_id,persona_id) VALUES(?,?,?,?)",[nombre,descripcion,categoria,person_id]);
        
       
        //Muestra el libro que ingresamos
        registro= await qy ('SELECT * FROM libro where nombre=? AND descripcion=? AND categoria_id=?',[nombre,descripcion,categoria]);
        res.status(200).send(registro);
   
   
    }

    //De existir algun error se activa mostrándolo
    catch(error){
        res.status (413).send({"error": error.message});
    }});


/*+++++++++++++++++++++++++++++++++ MUESTRA TODOS LOS LIBROS ++++++++++++++++++++++++++++++++++++++++++*/

   app.get("/libro",async(req,res)=>{
     try{

        //Muestro todos los registros de la tabla "libro"
        let respuesta = await qy("SELECT * FROM libro");
        
        //Si la respuesta a la query es 0, no hay libros en la BD
        if(respuesta.length==0){
            throw new Error ("No existen libros disponibles");
        }

        //Muestro por pantalla los libros existentes
        res.status(200).send(respuesta);
        }

        //De existir algun error se activa mostrándolo
         catch(error){
        
            res.status (413).send({"error": error.message});
         }
    });


/*********************************************************************************************************/
/* MUESTRA UN LIBRO EN PARTICULAR*/

app.get("/libro/:id",async(req,res)=>{
    try{

        let respuesta = await qy("SELECT * FROM libro WHERE id=?",[req.params.id]);
                   
        if(respuesta.length==0){
            throw new Error ("Libro no encontrado");
        }
        
        res.status(200).send(respuesta[0]);
        
    }                    

    //De existir algun error se activa mostrándolo
    catch(error){
   
        res.status (413).send({"error": error.message});
    }
});
/**************************************************************************************************************/
app.put('/libro/prestar/:id', async (req, res) => {
    try {

        const numero = req.params.id;
        const persona_id = req.body.persona_id
        
        let query = 'SELECT * FROM libro WHERE id = ?';
        let respuesta = await qy(query,[numero]);

        if (respuesta.length == 0) {
            throw new Error('No se encuentra ese libro');
        }

        if (respuesta[0].persona_id!=null) {
            throw new Error('El libro ya se encuentra prestado');
        }

        let consultaSeleccionar="SELECT * FROM persona WHERE id=?";
        let queryPersona = await qy(consultaSeleccionar, persona_id);

        //Chequea que el resultado no sea vacio
        if (queryPersona.length == 0) {
            throw new Error('No se encuentra esa persona');
        }

        query = ' UPDATE libro SET persona_id = ? WHERE id = ? ';

        respuesta = await qy(query,[persona_id, numero]);

        res.status(200).send("Se presto correctamente");
    }
    catch (error){
        res.status (413).send({"error": error.message});

    }

});
/**********************************************************************************************/
app.put('/libro/:id', async (req,res)=>{
    var persona= req.body.persona_id;
    try{
        if(!req.body.descripcion||!req.body.nombre || !req.body.categoria_id){
            throw new Error('faltan llenar campos obligatorios');
        
        }

        let query = 'SELECT * FROM libro WHERE id = ?';     
        let respuesta = await  qy(query, [ req.params.id]);
        if(respuesta.length == 0){
            throw new Error('El libro no existe en la base de datos');
        }
        if (persona==0){
            persona=null;
        }
        if(isNaN(persona)==false && persona!=respuesta[0].persona_id){
            
            throw new Error ("Solo se puede modificar la descripcion");
        }
        if(isNaN(persona)){
            throw new Error ("El id de persona es incorrecto");
        }  
        let nombre=req.body.nombre;
        let desc=req.body.descripcion;
        nombre=nombre.toUpperCase();
        if(desc.trim()==""){
            throw new Error ('no se pueden ingresar espacios en blanco, revise la descripción que ingreso');
        }
        desc=desc.toUpperCase();
         
        if(nombre!= respuesta[0].nombre|| req.body.categoria_id!= respuesta[0].categoria_id || persona!= respuesta[0].persona_id){
            throw new Error('solo se puede modificar la descripcion del libro');
        }
         
        query = 'UPDATE libro SET descripcion=? WHERE id = ?';
        
        respuesta = await qy(query, [desc, req.params.id]);

        res.status(200).send("Registro modificado correctamente");

    } 
    catch (error) {
        res.status (413).send({"error": error.message});
       
        
    }

});

/*************************************************************************************************************/

app.put('/libro/devolver/:id', async (req, res) => {
    try {

        const numero = req.params.id;
        
        let query = 'SELECT * FROM libro WHERE id = ?';
        let respuesta = await qy(query,[numero]);

        if (respuesta.length == 0) {
            throw new Error('Ese libro no existe.');
        }

        if (respuesta[0].persona_id==null) {
            throw new Error('Ese libro no estaba prestado');
        }

        query = ' UPDATE libro SET persona_id = ? WHERE id = ? ';
        var persona_id=null;
        respuesta = await qy(query,[persona_id, numero]);

        res.status(200).send("Se realizo la devolución correctamente");
    }
    catch (error){
        if (error.message!= 'Ese libro no estaba prestado' && error.message!= 'Ese libro no existe.' ){
            res.status(413).send({"error": "Error inesperado"});
            return;    
        }
        res.status(413).send({"error": error.message});

    }

});

/***********************************************************Delete Libro*****************************************************************/

app.delete('/libro/:id', async (req, res) => {

    let rpid = [req.params.id];

    try {
        let consultaSeleccionar="SELECT * FROM libro WHERE id=?";
        let queryLibros = await qy(consultaSeleccionar, rpid);

        //Chequea que el resultado no sea vacio
        if (queryLibros.length == 0) {
            throw new Error('No se encuentra ese libro');
        }
 
        if (queryLibros[0].persona_id!=null){
            throw new Error('Ese libro esta prestado no se puede borrar');
        }
        
        let consultaBorrar="delete from libro where id=?";
        let borraRegistro=await qy(consultaBorrar,rpid);

        res.status(200).send('Se borró correctamente');
    }
    catch (error) {
        res.status (413).send({"error": error.message});
    }
});

/******************************************************************************************************************/
/******************************************************************************************************************/

/**
 *  GENERO
 *  POST /categoria -> agregar un nuevo genero
 *  GET /categoria -> Obtener las categorias almacenadas
 *  GET /categoria/:id -> Obtener la categoria almacenada según el id proporcionado
 *  DELETE /categoria/:id -> Borrar la categoria
 */

app.post('/categoria',async (req,res)=>{

    

    try{
        if(!req.body.categ){
            throw new Error('Faltan datos');
        }
        //Para no estar llamando constantemente a [req.body.categ], el resultado lo guardo en una variable
        var categ_nueva=req.body.categ;
        //Se pasa la categoria a mayasculas ya que el enunciado solicita que se hagan las comprobaciones y el guardado en mayusculas.
        categ_nueva=categ_nueva.toUpperCase();
        //primero debo comprobar que el usuario efectivamente haya ingresado una categoria
        if(categ_nueva.trim()==""){
            throw new Error ("Error al ingresar el nombre de la categoria, no se pueden ingresar solo espacios en blanco");
        }

        let query='SELECT * FROM genero where nombre=?';
        let registros= await qy (query,categ_nueva);
    
        //Nos fijamos si esa categoria ya existe y si existe lanzamos error
        if(registros.length!=0){

            throw new Error('Ese nombre de categoria ya existe');

        }
        
        //si la categoria no existe (osea registros.length==0), guardo la informacion en la tabla correspondiente
        query='INSERT INTO genero(nombre) values (?)';
        registros= await qy(query, categ_nueva);
        
        //debemos hacer un nuevo select ya que el enunciado solicita que se devuelva también el id generado el cual
        // es la clave primaria y auto incremental por lo tanto no la tenemos hasta que se ingresa el nuevo genero. 
        query='SELECT * FROM genero where nombre=?';
        registros= await qy (query,categ_nueva);
        res.status(200).send(registros[0]);

    }
    catch(error){
    
        //de existir algun error se lanza
        res.status (413).send({"error": error.message});
    
    }
    
});

/******************************************************************************************************************/

app.get('/categoria',async (req,res)=>{
   
    try{

        let registros= await qy ('SELECT * FROM genero');
       
        //Nos fijamos que haya alguna categoria disponible sino lanzamos error
        if(registros.length==0){

            throw new Error ("No se han encontrado géneros de libros en la base de datos");

        }
   
        res.status(200).send(registros);   
   
    }
    catch(error){
   
        //de existir algun error se lanza
        res.status (413).send({"error": error.message});
   
    }

});

/******************************************************************************************************************/

app.get('/categoria/:id',async (req,res)=>{
   
    let nid= [req.params.id];

    try{
        let query='SELECT * FROM genero where id=?';
        let registros= await qy (query,nid);
        //Nos fijamos que haya alguna categoria disponible sino lanzamos error
        if(registros.length==0){
            throw new Error('Categoria no encontrada');

        }

        res.status(200).send(registros[0]);

    }
    catch(error){
        
        //de existir algun error se lanza
        if(error.message!='Categoria no encontrada'){
        
            res.status (413).send ({"mensaje":"error inesperado"});
            return;    
        
        }

        res.status (413).send({"error": error.message});

    }

});

/******************************************************************************************************************/
app.delete('/categoria/:id',async (req,res)=>{
   
    let nid=req.params.id;

    try{
        let query='SELECT * FROM genero where id=?';
        let registros= await qy (query,nid);
        
        //Nos fijamos que haya alguna categoria con ese id sino lanzamos error
        if(registros.length==0){
        
            throw new Error('no existe la categoria indicada, Categoria no encontrada');

        }else{
        
            //de existir el genero lo que se hara es consultar si tiene algun libro asociado, ya que de ser
            //asi no se podria borrar y hay que tirar error.
            let registros_aux= await qy ('SELECT * FROM libro where categoria_id=?',nid);
            
            if(registros_aux.length!=0){

                throw new Error("categoria con libros asociados, no se puede eliminar");
        
            }

            let borrar=await qy ('delete from genero where id=?',nid);

        }

        res.status(200).send("Categoria se borro correctamente");

    }
    catch(error){

        if( error.message!='no existe la categoria indicada, Categoria no encontrada' && error.message!="categoria con libros asociados, no se puede eliminar"){
            
            //cualquier error distinto a los dos anteriores lanzará este error
            res.status(413).send({"error":"error inesperado"});
            return;

        }

        res.status(413).send({"error":error.message});
    
    }
});
//ruta de rafa 
app.get('/categoria/:id/libros',async (req,res)=>{
   
    let nid= [req.params.id];

    try{
        let queryCateg= 'SELECT * FROM genero where id=?';
        let registrosCateg= await qy (queryCateg,nid);
        
        if(registrosCateg.length===0){
            throw new Error('Categoria no existente');

        }
        let query='SELECT * FROM libro where categoria_id=?';
        let registros= await qy (query,nid);
        //Nos fijamos que haya algun libro con esa categoria disponible sino lanzamos error
        if(registros.length===0){
            throw new Error('Libros no encontrados');

        }

        res.status(200).send(registros);

    }
    catch(error){
        
        //de existir algun error se lanza
        if(error.message!='Libros no encontrados' && error.message!='Categoria no existente'){
        
            res.status (413).send ({"error":"error inesperado"});
            return;    
        
        }

        res.status (413).send ({"error":error.message});

    }

});

//ruta mariana
app.get ('/listaPersonayLibros', async (req, res) =>{

    try{

        let respuesta = await qy("SELECT persona.nombre AS nombre, persona.apellido AS apellido, persona.alias As alias, libro.nombre AS nombrelibro FROM persona LEFT JOIN libro ON persona.id=libro.persona_id");
        
       
        if(respuesta.length==0){
            throw new Error ("No hay personas registradas, con libros prestados");
        }

        res.status(200).send(respuesta);
        }

  
         catch(error){
        
         res.status (413).send ({"error": error.message});
         }
}
)




/******************************************************************************************************************/
/******************************************************************************************************************/

app.listen(4000,()=>{
    console.log('puerto '+ 4000);
});


