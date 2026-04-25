import mysql from 'mysql2/promise';

process.loadEnvFile();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,  
});

/*
encriptacion:  es con  sha-256 con una funcion crypto

la contraseña es la primera parte del email hasta el @
en sql se hace select * from usuarios where contrasenia = sha2('vrimada', 256)

*/