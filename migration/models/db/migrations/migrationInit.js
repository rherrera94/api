const {db} = require('../db');//tomo la conexion
(async () =>{
    try{
        await db.schema.createTable('direccion',table =>{
            table.increments('id');
            table.string('direccion').notNullable();
            table.integer('altura').defaultTo(null);
            table.string('depto',20).defaultTo(null);
            table.string('codPos',10).notNullable();
            table.integer('provincia').unsigned().notNullable();
            table.integer('localidad').unsigned().notNullable();
            table.integer('eliminado').defaultTo(null);
        })
        .then(()=>console.log("Tabla direccion creada"))
        .then(async ()=>{
            await db.schema.createTable('organismo',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('denominacion',50).notNullable();
                table.integer('direccion').unsigned().notNullable();
                table.string('telefono',50).notNullable();
                table.string('mail',100).notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('direccion').references('id').inTable('direccion');
            })
        })
        .then(()=>console.log("Tabla organismo creada"))
        .then(async ()=>{
            await db.schema.createTable('empleado',table =>{
                table.increments('id');
                table.string('cuil',16).notNullable();
                table.string('apellido',50).notNullable();
                table.string('nombre',50).notNullable();
                table.string('mail',100).notNullable();
                table.integer('idOrganismo').unsigned().notNullable();
                table.string('cargo',50).notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('idOrganismo').references('id').inTable('organismo');
            })
        })
        .then(()=>console.log("Tabla empleado creada"))
        .then(async ()=>{
            await db.schema.createTable('proveedor',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('razonSocial',100).notNullable();
                table.string('tPersona',20).notNullable();
                table.string('mail',100).notNullable();
                table.integer('provincia').unsigned().notNullable();
                table.integer('localidad').unsigned().notNullable();
                table.string('telefono',50).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla proveedor creada"))
        .then(async ()=>{
            await db.schema.createTable('rol',table =>{
                table.increments('id');
                table.string('nombre',30).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla rol creada"))
        .then(async ()=>{
            await db.schema.createTable('tlicitacion',table =>{
                table.increments('id');
                table.string('nombre',30).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla tlicitacion creada"))
        .then(async ()=>{
            await db.schema.createTable('permiso',table =>{
                table.string('id',30).notNullable();
                table.integer('idrol').unsigned().notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('idrol').references('id').inTable('rol');
            })
        })
        .then(()=>console.log("Tabla permiso creada"))
        .then(async ()=>{
            await db.schema.createTable('usuariointerno',table =>{
                table.increments('id');
                table.string('nombre',50).notNullable();
                table.string('contrasenia',100).notNullable();
                table.integer('idRol').unsigned().notNullable();
                table.integer('idEmpleado').unsigned().notNullable();
                table.string('mail',100).notNullable();
                table.integer('baja').defaultTo(null);
                table.foreign('idRol').references('id').inTable('rol');
                table.foreign('idEmpleado').references('id').inTable('empleado');
            })
        })
        .then(()=>console.log("Tabla usuariointerno creada"))
        .then(async ()=>{
            await db.schema.createTable('usuarioexterno',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('mail',100).notNullable();
                table.string('contrasenia',100).notNullable();
                table.integer('idProveedor').unsigned().notNullable();
                table.integer('baja').defaultTo(null);
                table.foreign('idProveedor').references('id').inTable('proveedor');
            })
        })
        .then(()=>console.log("Tabla usuarioexterno creada"))
        .then(async ()=>{
            await db.schema.createTable('legitimoabono',table =>{
                table.increments('id');
                table.integer('idOrganismo').unsigned().notNullable();
                table.integer('idProveedor').unsigned().notNullable();
                table.text('descripcion').notNullable();
                table.date('fechaInicio').notNullable();
                table.date('fechaFin').notNullable();
                table.float('monto').notNullable();
                table.text('justificacion').notNullable();
                table.text('actoDispositivo').notNullable();
                table.integer('borrado').defaultTo(null);
		        table.integer('idUsuario').unsigned().notNullable();
                table.foreign('idOrganismo').references('id').inTable('organismo');
                table.foreign('idProveedor').references('id').inTable('proveedor');
		        table.foreign('idUsuario').references('id').inTable('usuariointerno');
            })
        })
        .then(()=>console.log("Tabla legitimoabono creada"))
	    .then(async ()=>{
            await db.schema.createTable('pliego',table =>{
                table.increments('id');
                table.text('archivo').notNullable();
                table.date('fecha').notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla pliego creada"))
	
	.then(async ()=>{
            await db.schema.createTable('detallelicitacion',table =>{
                table.increments('id');
		        table.integer('idpliego').unsigned().notNullable();
                table.date('fecha').notNullable();
                table.date('fechalimite').notNullable();
                table.date('fechaapertura').notNullable();
                table.text('dictamen').notNullable();
                table.text('actaadjudicacion').notNullable();
                table.text('actaapertura').notNullable();
                table.integer('baja').defaultTo(null);
		        table.foreign('idpliego').references('id').inTable('pliego');
            })
        })
        .then(()=>console.log("Tabla detallelicitacion creada"))
	    .then(async ()=>{
            await db.schema.createTable('licitacion',table =>{
                table.increments('id');
		        table.integer('idOrganismo').unsigned().notNullable();
                table.integer('idUsuario').unsigned().notNullable();
                table.integer('idDetalle').unsigned().notNullable();
                table.integer('idTipo').unsigned().notNullable();
                table.integer('finalizada').unsigned().notNullable();
                table.integer('eliminada').defaultTo(null);
                table.foreign('idOrganismo').references('id').inTable('organismo');
                table.foreign('idUsuario').references('id').inTable('usuariointerno');
                table.foreign('idDetalle').references('id').inTable('detallelicitacion');
                table.foreign('idTipo').references('id').inTable('tlicitacion');
            })
        })
        .then(()=>console.log("Tabla licitacion creada"))
	    .then(async ()=>{
            await db.schema.createTable('propuestaslicitacion',table =>{
                table.increments('id');
		        table.integer('idLicitacion').unsigned().notNullable();
                table.integer('idProveedor').unsigned().notNullable();
		        table.text('propuesta').notNullable();
		        table.date('fecha').notNullable();	
		        table.integer('eliminado').defaultTo(null);
		        table.foreign('idLicitacion').references('id').inTable('licitacion');
		        table.foreign('idProveedor').references('id').inTable('proveedor');
	        })
        })
        .then(()=>console.log("Tabla propuestaslicitacion creada"))
    }catch(e){
        console.log(e)
        console.log("Se ha producido un error en el proceso de migración")
    }
    
    process.exit(0);// esto lo hago para que no se quede colgado el sistema y haya que apretar ctrl+c   
})()