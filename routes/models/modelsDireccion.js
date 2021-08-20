require('dotenv').config({ path:'../../.env'});
const qy=require('../../config/conexion');
/*********************************************************************/
/**
 * Guarda en la base de datos, especificamente a la tabla
 * direccion la direccion que se pasa por parametros.
 * @returns {JSON} Devuelve un JSON con la direccion que se guardo.
 */
 async function guardarDireccion(direccion){
    let query='INSERT INTO direccion (direccion,altura,piso,depto,codPos,provincia,localidad) values (?,?,?,?,?,?,?)';
    await qy (query,[direccion.direccion,direccion.altura,direccion.piso,direccion.depto,direccion.codPos,direccion.provincia,direccion.localidad]);
    try{
        let resultado=await direccionEntGet(direccion);
        return resultado;
    }catch{
        //la direccion ya ha sido ingresada pero al querer devolver al usuario el registro ingresado existio un error de lectura
        return [];
    }    

}

/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de un listado generalizado todas las direcciones
 * registradas.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla direccion.
 */
async function direccionesList(){
    let registros=await qy ('SELECT * FROM direccion');
    return registros;

}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de la direccion con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id de la dirección a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla direccion.
 */
async function direccionGet (id){
    let query='SELECT * FROM direccion WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de la direccion que se esta pasando por parámetro.
 *@param {Object} direccion direccion a buscar
 * @returns {Integer} devuelve el codigo de la direccion buscada.
 */
 async function direccionEntGet(direccion){
    if(!direccion.piso && !direccion.depto ){
        let query='SELECT * FROM direccion WHERE direccion=? and altura=? and piso is ? and depto is ? and codPos=? and provincia=? and localidad=?';
        let registros=await qy (query,[direccion.direccion,direccion.altura,direccion.piso,direccion.depto,direccion.codPos,direccion.provincia,direccion.localidad]);
        return registros[0];
    }else{
        if(!direccion.piso){
            let query='SELECT * FROM direccion WHERE direccion=? and altura=? and piso is ? and depto= ? and codPos=? and provincia=? and localidad=?';
            let registros=await qy (query,[direccion.direccion,direccion.altura,direccion.piso,direccion.depto,direccion.codPos,direccion.provincia,direccion.localidad]);
            return registros[0];
        }else{
            if (!direccion.depto){
                let query='SELECT * FROM direccion WHERE direccion=? and altura=? and piso= ? and depto is ? and codPos=? and provincia=? and localidad=?';
                let registros=await qy (query,[direccion.direccion,direccion.altura,direccion.piso,direccion.depto,direccion.codPos,direccion.provincia,direccion.localidad]);
                return registros[0];
            }else{
                let query='SELECT * FROM direccion WHERE direccion=? and altura=? and piso= ? and depto= ? and codPos=? and provincia=? and localidad=?';
                let registros=await qy (query,[direccion.direccion,direccion.altura,direccion.piso,direccion.depto,direccion.codPos,direccion.provincia,direccion.localidad]);
                return registros[0];
            }
        }
    }
}

module.exports={
    direccionGet,
    direccionesList,
    direccionEntGet,
    guardarDireccion
}