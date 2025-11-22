const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routerCasa = require("./controller/Casa")
const routerMorador = require("./controller/Morador")

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
  })
);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/casa",routerCasa)
app.use("/morador",routerMorador)
const port = 3001;
app.listen(port,() => {
  console.log(`servidor ligado com sucesso na porta ${port}`);
});
