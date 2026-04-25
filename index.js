import express from "express";
const app  = express();
import { pool } from "./db/conexion.js"; 


process.loadEnvFile(); //carga las variables de entorno desde un archivo .env, si existe. Esto es útil para configurar la aplicacion sin tener que modificar el codigo, por ejemplo, para cambiar el puerto o la base de datos.
app.use(express.json()); //middleware para parsear el cuerpo de las solicitudes en formato JSON, es decir, convierte el cuerpo de la solicitud en un objeto JavaScript que se puede usar en el codigo. Esto es necesario para poder recibir datos del navegador en formato JSON.

const PORT = process.env.PORT || 3000; //toma el puerto de las variables de entorno, si no existe, usa el puerto 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} HOLA HOLA`); //control para control
    //Abre localhost:3000 en el navegador para ver el resultado
});

app.get("/", (req, res) => {   
//en req, se recibe la solicitud del navegador (informacion del navegador, como la url, los parametros, etc )
//en response, se envia un mensaje al navegador (puede ser un mensaje de texto, un archivo, un html)
//res.status(200).send("Hello World!"); //envia un mensaje al navegador con el estado 200 (OK)
res.send(
    {"message": "Bienvenido a mi servidor Express!",
        "estado": "OK"
    }); //envia otro mensaje al navegador, pero no se ejecuta porque ya se envio el primer mensaje

//json viewer pro para que en el navegador se vea el mensaje de una forma mas legible, con colores y formato, en lugar de un mensaje plano. Es una extension de chrome que se puede instalar para ver los mensajes json de una forma mas clara.
//Bruno es una extension para VSCOde que es como el postman, despues nos explica como instalarlo

}); //ruta raiz, se ejecuta cuando se accede a localhost:3000

app.post("/especialidades", (req, res) => {  
    console.log("POST");
    console.log(req.body.nombre); //muestra en la consola del servidor el cuerpo de la solicitud, es decir, los datos que se enviaron desde el navegador. Para que esto funcione, es necesario usar un middleware como express.json() para parsear el cuerpo de la solicitud y convertirlo en un objeto JavaScript.
    res.send("Especialidad recibida"); //envia un mensaje al navegador con el estado 200 (OK) y el mensaje "Especialidad recibida"

}); //ruta para recibir datos del navegador, se ejecuta cuando se accede a localhost:3000/data con el metodo POST


//21/4/2026

app.get("/especialidades", async (req, res) => {

    try{
    const sql = "SELECT * FROM especialidades WHERE activo = 1"; 

    const [especialidades,fields] = await pool.query(sql); 

    console.log(especialidades); 
    res.status(200).send({'estado': 'ok', 'especialidades': 'especialidades'});
    }
    catch(error){
        console.error(error); //muestra el error en la consola del servidor
    }
});