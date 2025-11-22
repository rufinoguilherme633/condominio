const MoradorSchema = require("../models/MoradorSchema");

function validate_info(data_name, data) {
  if (data === undefined || data === null || data === "") {
    return {
      success: false,
      status_code: 401,
      message: `${data_name} campo invalido`,
    };
  }

  return { success: true };
}

async function cadastrar_morador(data) {
  for (const key in data) {
    const results = validate_info(key, data[key]);
    if (results.success === false) {
      return {
        success: results.success,
        status_code: results.status_code,
        message: results.message,
      };
    }
  }

  try {
    const newMorador = await MoradorSchema.create({
      nome: data.nome,
      cpf: data.cpf,
      data_nascimento: data.data_nascimento,
      sexo: data.sexo,
      telefone: data.telefone,
      proprietario_casa: data.proprietario_casa,
    });

    return {
      success: true,
      status_code: 201,
      data: newMorador,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}

async function editar_morador(data, id_morador) {
  for (const key in data) {
    const results = validate_info(key, data[key]);
    if (results.success === false) {
      return {
        success: results.success,
        status_code: results.status_code,
        message: results.message,
      };
    }
  }

  const update_morador = await MoradorSchema.findOne({ _id: id_morador });

  if (!update_morador) {
    return {
      success: false,
      status_code: 404,
      message: "morador não encontrada",
    };
  }

  try {
    update_morador.nome = data.nome;
    update_morador.cpf = data.cpf;
    update_morador.data_nascimento = data.data_nascimento;
    update_morador.sexo = data.sexo;
    update_morador.telefone = data.telefone;
    update_morador.proprietario_casa = data.proprietario_casa;

    update_morador.save();

    return {
      success: true,
      status_code: 200,
      data: update_morador,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}



async function listar_moradores() {
  try {
    const lista = await MoradorSchema.find();

    if (lista.length === 0) {
      return {
        success: false,
        status_code: 201,
        message: "não ha moradores cadastrados",
      };
    }

    return {
      success: true,
      status_code: 200,
      data: lista,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}




async function mostrar_morador(id_morado) {
  try {
    const morador = await MoradorSchema.findOne({_id:id_morado});

    if (!morador) {
      return {
        success: false,
        status_code: 201,
        message: "não ha moradores ",
      };
    }

    return {
      success: true,
      status_code: 200,
      data: morador,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}

async function deletar_morador(id_morador) {
  try {
    await MoradorSchema.deleteOne({_id:id_morador});

    return {
      success: true,
      status_code: 200,
      data: "deletado com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}




module.exports = {
  cadastrar_morador,
  editar_morador,
  listar_moradores,
  deletar_morador,
  mostrar_morador
};
