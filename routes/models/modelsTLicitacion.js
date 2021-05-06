require('dotenv').config({ path:'../../.env'});
/********************CONEXIÓN A BASE DE DATOS*************************/
/*   Se utilizan variables de entorno para ocultar datos sensibles.  */
/*********************************************************************/
var mysql=require('mysql');
const util=require ('util'); // no se necesita instalarla

var conexion= mysql.createConnection({
    host: process.env.APP_HOST,
    user: process.env.APP_USER,
    password:process.env.APP_KEY,
    database:process.env.APP_DB
});

conexion.connect((error)=>{
    
    if(error){
        console.log("Error en la conexion a la Base de datos");
        return;

    }

});
    
const qy= util.promisify(conexion.query).bind(conexion); //permitira el uso de async-await en la conexion mysql
/*********************************************************************/

async function tlicitacionesList(){
    let registros=await qy ('SELECT * FROM tLicitacion');
    return registros;

}

async function tlicitacionGet (id){

    let query='SELECT * FROM tLicitacion WHERE id=?';
    let registros=await qy (query,id);
    return registros;

}

async function tlicitacionBorrado(id){
    let query = 'UPDATE tlicitacion SET eliminado=? WHERE id = ?';
    await qy(query, [1, id]);
    return await tlicitacionGet(id);
}

module.exports={
    tlicitacionGet,
    tlicitacionesList,
    tlicitacionBorrado
}