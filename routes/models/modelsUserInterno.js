const qy=require('../../config/conexion');
class UserIntetnoModel{
	async create(user){
        let query='INSERT INTO usuariointerno (nombre,contrasenia,idRol,idEmpleado,mail) values (?,?,?,?,?)';
        await qy (query,[user.nombre,user.contrasenia,user.idRol,user.idEmpleado,user.mail]);
	}
	
	async findByNombre(nombre){
		let query='select * from usuariointerno where nombre=?';
        let resultado= await qy (query,[nombre]);
        return resultado;
	}
	async getPermisos(rol){
		let query='select * from permiso where role_id=?';
        let resultado= await qy (query,[rol]);
		return resultado;
	}
	async getRol(rol){
		let query='select * from rol where nombre=?';
        let resultado= await qy (query,[rol]);
		return resultado;
	}
	async setPermisos(permisos){
		var arrayPermisos=[];
		var queryCheck="";
		var resultado="";
		for(let i=0;i<permisos.permisos.length;i++){
			 queryCheck='select * from permiso where role_id=? and id=?';
        	 resultado= await qy (queryCheck,[permisos.rolusuario,permisos.permisos[i]]);
			if (resultado.length==0){
				let query='INSERT INTO permiso (id,role_id) values (?,?)';
        		await qy (query,[permisos.permisos[i],permisos.rolusuario]);
				arrayPermisos.push(permisos.permisos[i]);
			}
		}
		return arrayPermisos;
	}
}
module.exports=new UserIntetnoModel();