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
		let query='select * from permisos where role_id=?';
        let resultado= await qy (query,[rol]);
		return resultado;
	}
}
module.exports=new UserIntetnoModel();