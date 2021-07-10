require('dotenv').config({ path:'../../.env'});
/********************CONEXIÓN A BASE DE DATOS*************************/
/*   Se utilizan variables de entorno para ocultar datos sensibles.  */
/*********************************************************************/
var mysql=require('mysql');
const { REPL_MODE_SLOPPY } = require('repl');
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

/**
 * @param {object} legitimoAbono objeto con la informacion del legitimo abono a agregar 
 */
async function legitimoAb(legitimoAbono){
    let query='INSERT INTO legitimoabono (idorganismo,idproveedor,descripcion,fechainicio,fechafin,monto,justificacion,actodispositivo,idusuario) value (?,?,?,?,?,?,?,?,?)';
    await qy (query,[legitimoAbono.organismo, legitimoAbono.proveedor, legitimoAbono.descripcion,legitimoAbono.fechaInicio,legitimoAbono.fechaFin, legitimoAbono.monto, legitimoAbono.justificacion,legitimoAbono.actodispositivo, legitimoAbono.idusuario]);
}


module.exports={
    legitimoAb
}