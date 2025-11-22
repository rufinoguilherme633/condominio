const express = require("express");
const router = express.Router();
const { cadastrar_casa, editar_casa ,listar_casas,deletar_casa} = require("../Service/Casa");

function validate_applicate_json(req, res, next) {
  const contentType = req.headers["content-type"];
  if (!contentType) {
    return res.status(400).json({ error: "Content-Type JSON é obrigatório" });
  }

  if (!contentType.includes("application/json")) {
    return res
      .status(415)
      .json({ error: "O servidor aceita apenas application/json" });
  }

  next();
}

function validate_exist_json(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Body JSON vazio ou ausente" });
  }
  next();
}

router.post("/",validate_applicate_json,validate_exist_json, async (req, res) => {
    const required = [
      "cep",
      "cidade",
      "logradouro",
      "numero",
      "complemento",
      "moradores",
    ];

    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} é obrigatório.` });
      }
    }

    const results = await cadastrar_casa(req.body);

    if (results.success) {
      return res.status(results.status_code).json( results.data );
    } else {
      return res.status(results.status_code).json({ error: results.message });
    }
  }
);



router.put("/:id",validate_applicate_json,validate_exist_json, async (req, res) => {

  const id_casa = req.params.id
    const required = [
      "cep",
      "cidade",
      "logradouro",
      "numero",
      "complemento",
      "moradores",
    ];

    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} é obrigatório.` });
      }
    }

    const results = await editar_casa(req.body, id_casa);

    if (results.success) {
      return res.status(results.status_code).json({ data: results.data });
    } else {
      return res.status(results.status_code).json({ error: results.message });
    }
  }
);




router.get(
  "/",async (req, res) => {
   


    const results = await listar_casas();

    if (results.success) {
      return res.status(results.status_code).json( results.data );
    } else {
      return res.status(results.status_code).json({ error: results.message });
    }
  }
);





router.delete(
  "/:id",async (req, res) => {
   
const id_morador = req.params.id;

    const results = await deletar_casa(id_morador);

    if (results.success) {
      return res.status(results.status_code).json( results.data );
    } else {
      return res.status(results.status_code).json({ error: results.message });
    }
  }
);


module.exports = router;
