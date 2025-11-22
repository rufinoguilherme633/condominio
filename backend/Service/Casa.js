const CasaSchema = require("../models/CasaSchema");
const MoradorSchema = require("../models/MoradorSchema");

function validate_info(data_name, data) {
  if (!data || data === "" || data === undefined) {
    return {
      success: false,
      status_code: 401,
      message: `${data_name} campo invalido`,
    };
  }

  return { success: true };
}

async function validate_morador(moradorId) {
  try {
    const morador = await MoradorSchema.findById(moradorId);
    if (!morador) {
      return {
        success: false,
        status_code: 404,
        message: `Morador não encontrado: ${moradorId}`,
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: `Erro ao validar morador: ${error.message}`,
    };
  }
}

async function cadastrar_casa(data) {
  for (const key in data) {
    if (key !== "moradores") {
      const results = validate_info(key, data[key]);
      if (!results.success) {
        return results;
      }
    }
  }

  if (data.moradores && Array.isArray(data.moradores)) {
    for (const moradorId of data.moradores) {
      const result = await validate_morador(moradorId);
      if (!result.success) return result;
    }
  } else {
    return {
      success: false,
      status_code: 401,
      message: "Campo moradores inválido ou vazio",
    };
  }

  console.log(data)
  try {
    const newCasa = await CasaSchema.create(
      data
    );

    return {
      success: true,
      status_code: 201,
      data: newCasa,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: error.message,
    };
  }
}

async function editar_casa(data, id_casa) {
  // 1️⃣ Valida campos da casa
  for (const key in data) {
    if (key !== "moradores") {
      const results = validate_info(key, data[key]);
      if (!results.success) return results;
    }
  }

  // 2️⃣ Busca casa
  const update_casa = await CasaSchema.findOne({ _id: id_casa });
  if (!update_casa) {
    return { success: false, status_code: 404, message: "Casa não encontrada" };
  }

  // 3️⃣ Valida moradores
  if (data.moradores && Array.isArray(data.moradores)) {
    for (const moradorId of data.moradores) {
      const result = await validate_morador(moradorId);
      if (!result.success) return result;
    }
  }

  // 4️⃣ Atualiza e salva
  try {
    update_casa.cep = data.cep;
    update_casa.cidade = data.cidade;
    update_casa.logradouro = data.logradouro;
    update_casa.numero = data.numero;
    update_casa.complemento = data.complemento;
    update_casa.moradores = data.moradores;

    await update_casa.save();

    return { success: true, status_code: 200, data: update_casa };
  } catch (error) {
    return { success: false, status_code: 500, message: error.message };
  }
}



async function listar_casas() {
  try {
    const lista = await CasaSchema.find();

    if (lista.length === 0) {
      return {
        success: false,
        status_code: 201,
        message: "não ha casas cadastrados",
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




async function deletar_casa(id_casa) {
  try {
    await CasaSchema.deleteOne({_id:id_casa});

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
  cadastrar_casa,
  editar_casa,
  listar_casas,
  deletar_casa
};
