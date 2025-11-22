const base_url = "http://localhost:3001/casa";

export async function listar_casas() {
  try {
    const response = await fetch(`${base_url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { sucesso: false, mensagem: data.error };
    }

    return { sucesso: true, data: data };
  } catch (error) {
    return { sucesso: false, mensagem: "Erro de conexão com o servidor" };
  }
}



// aqui 



export async function cadastrar_casa(
  cep,
  cidade,
  logradouro,
  numero,
  complemento,
  moradores = [] // array de IDs de moradores
) {
  try {
    const response = await fetch(base_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cep,
        cidade,
        logradouro,
        numero,
        complemento,
        moradores,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { sucesso: false, mensagem: data.error };
    }

    return { sucesso: true, data };
  } catch (error) {
    return { sucesso: false, mensagem: "Erro ao conectar com o servidor" };
  }
}

/* ============================
    EDITAR CASA
============================ */
export async function editar_casa(
  id,
  cep,
  cidade,
  logradouro,
  numero,
  complemento,
  moradores = [] // array de IDs
) {
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cep,
        cidade,
        logradouro,
        numero,
        complemento,
        moradores,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { sucesso: false, mensagem: data.error };
    }

    return { sucesso: true, data };
  } catch (error) {
    return { sucesso: false, mensagem: "Erro ao conectar com o servidor" };
  }
}

/* ============================
    DELETAR CASA
============================ */
export async function deletar_casa(id_casa) {
  try {
    const response = await fetch(`${base_url}/${id_casa}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      return { sucesso: false, mensagem: data.error };
    }

    return { sucesso: true, data };
  } catch (error) {
    return { sucesso: false, mensagem: "Erro de conexão com o servidor" };
  }
}

