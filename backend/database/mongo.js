const mongoose = require("mongoose");


const Schema = mongoose.Schema.Types;


const connection = mongoose.connect("mongodb://localhost/condominio").then(

    console.log("conectado com sucesso ao banco")
).catch((error)=>{
    console.log(`erro ao se conectar ao banco => ${error}`)
})


module.exports ={
    connection,
    mongoose
}