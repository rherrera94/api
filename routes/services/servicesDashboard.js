const model= require ('../models/modelsDashboard');

class Dashboard{
    async getLegABusuarios(){
        return model.getLegABusuarios();
    }
    async getUsuariosCount(){
        return model.getUsuariosCount();
    }
    async getProveedoresCount(){
        return model.getProveedoresCount();
    }

}
module.exports=new Dashboard;

