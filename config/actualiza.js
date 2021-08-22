const fs=require('fs');
const fetch = require("node-fetch");
(async()=>{
    const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
    const buffer = await response.buffer();
    let prov=JSON.parse(buffer.toString());
    fs.writeFile(`./provincias.txt`, JSON.stringify(prov.provincias), () => 
    console.log('se termino el proceso de descarga!'));
})()