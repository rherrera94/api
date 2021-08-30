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
	async findByNombreAndUpdate(nombre, usuarioUpdated){
		
	}
	async findByNombreAndDelete(nombre){

	}
}
module.exports=new UserIntetnoModel();