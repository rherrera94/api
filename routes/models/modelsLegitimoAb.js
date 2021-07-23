const qy=require('../../config/conexion');
/**
 * @param {object} legitimoAbono objeto con la informacion del legitimo abono a agregar
 * @returns {Array} Devuelve la información que fue cargada en la base de datos o de haber algun
 * error devuelve un array vacio. 
 */
async function legitimoAb(legitimoAbono){
    let query='INSERT INTO legitimoabono (idorganismo,idproveedor,descripcion,fechainicio,fechafin,monto,justificacion,actoDispositivo,idusuario,fecha) values (?,?,?,?,?,?,?,?,?,?)';
    await qy (query,[legitimoAbono.organismo, legitimoAbono.proveedor, legitimoAbono.descripcion,legitimoAbono.fechaInicio,legitimoAbono.fechaFin, legitimoAbono.monto, legitimoAbono.justificacion,legitimoAbono.actoDispositivo, legitimoAbono.idusuario,legitimoAbono.fecha]);
    try{
        query='SELECT * FROM legitimoabono WHERE idorganismo=? and idproveedor=? and descripcion=? and fechainicio=? and fechafin=? and monto=? and justificacion=? and actodispositivo=? and idusuario=? and fecha=?';
        let resultado = await qy (query,[legitimoAbono.organismo, legitimoAbono.proveedor, legitimoAbono.descripcion,legitimoAbono.fechaInicio,legitimoAbono.fechaFin, legitimoAbono.monto, legitimoAbono.justificacion,legitimoAbono.actoDispositivo, legitimoAbono.idusuario,legitimoAbono.fecha]);
        return resultado;
    }catch{
        //el legitimo abono ya ha sido ingresado pero al querer devolver al usuario el registro ingresado existio un error de lectura
        return [];
    }    
}
/**
 * @returns {JSON} Devuelve el resultado de la consulta generalizada
 * a la tabla legitimo abono.  
 */
 async function legitimoAbGet(id){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.id=?';
    let registros=await qy (query,[id]);
    return registros;
}

/**
 * @returns {JSON} Devuelve el resultado de la consulta generalizada
 * a la tabla legitimo abono.  
 */
 async function legitimoAbList(){
    let registros=await qy ('SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id');
    return registros;
}

/**
 * @returns {JSON} Devuelve el resultado de la consulta segun id de proveedor
 * a la tabla legitimo abono.  
 */
 async function legitimoAbIpGet(proveedor){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.idProveedor=?';
    let registros=await qy (query,[proveedor]);
    return registros;
}
/**
 * @returns {JSON} Devuelve el resultado de la consulta segun cuit de proveedor
 * a la tabla legitimo abono.  
 */
 async function legitimoAbCuitGet(proveedor){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and proveedor.cuit=?';
    let registros=await qy (query,[proveedor]);
    return registros;
}
/**
 * @returns {JSON} Devuelve el resultado de la consulta segun id de organismo
 * a la tabla legitimo abono.  
 */
 async function legitimoAbIoGet(organismo){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.idOrganismo=?';
    let registros=await qy (query,[organismo]);
    return registros;
}
module.exports={
    legitimoAb,
    legitimoAbGet,
    legitimoAbList,
    legitimoAbIpGet,
    legitimoAbIoGet,
    legitimoAbCuitGet
}