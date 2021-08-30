const userModel=require('../models/modelsUserInterno');

class UserInterno{
	/**
	 * Llama al create del userModel con el fin de crear un nuevo usuario
	 * @param {Object} user 
	 */
	async createUser(user){
		await userModel.create(user);
	}
	/**
	 * Devuelve el usuario por el cual se consulta
	 * @param {String} nombre nombre de usuario que se consulta
	 * @returns {Array} devuelve un array con la informacion encontrada 
	 */
	async getUser(nombre){
		return userModel.findByNombre(nombre);
	}
	/**
	 * Devuelve el usuario por el cual se consulta
	 * @param {Number} rol id de rol del cual se necesitan saber los permisos
	 * @returns {Array} devuelve un array con la informacion encontrada 
	 */
	async getPermisos(rol){
		const permisos= await userModel.getPermisos(rol);
		return permisos;
	}
}
module.exports=new UserInterno;