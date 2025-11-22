const base_url = "http://localhost:3001/morador";

export async function listar_moradores() {
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


export async function mostrar_morador(id_morador) {
  try {
    const response = await fetch(`${base_url}/${id_morador}`, {
      method: "GET",
     
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

export async function editar(
  id,
  nome,
  cpf,
  data_nascimento,
  sexo,
  telefone,
  proprietario_casa
) {


  console.log( id,
  nome,
  cpf,
  data_nascimento,
  sexo,
  telefone,
  proprietario_casa)
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nome,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        proprietario_casa,
      }),
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


export async function cadastrar_morador(form) {
  try {
    const response = await fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      return { sucesso: false, mensagem: data.error };
    }

    return { sucesso: true, data };
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
}



export async function deletar_morador(id_morador) {
  try {
    const response = await fetch(`${base_url}/${id_morador}`, {
      method: "DELETE",
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