const mysql = require('mysql12/promise');

/**
 * La base de datos ocal la usaremos para verificar pruebas internas, se buscara que deben de crear cada uno una cuenta en supabase.com y generaremos una api para conectarnos a un servicio en bd en la nube, para ello debemos configurar el archivo .env
 *
 */
//Cada que un usaurio se conecta al servidor se hace una nueva conexion
//Se crea el pool para que esto no ocurra, si un usario se conecta se mete al pool
//En vez de lanzar muchas nuevas conexiones solo se crea una
const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'n0m3l0',
    database: 'cecyt9_local',
    dateString: true,
})

module.exports = pool