const userModel=require('../models/modelsUserInterno');

class UserInterno{
	async createUser(user){
		await userModel.create(user);
	}
	
	async getUser(nombre){
		return userModel.findByNombre(nombre);
	}
	async updateUser(nombre, usuarioUpdated){
		const userToUpdate=await userModel.findByNombreAndUpdate(nombre,userUpdated);
		return userToUpdate;
	}
	async deleteUser(nombre){
		await userModel.findByNombreAndDelete(nombre);
	}
}
module.exports=new UserInterno;