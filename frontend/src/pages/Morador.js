import { useEffect, useState } from "react";
import { listar_moradores, editar, cadastrar_morador,deletar_morador } from "../router/Morador";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function Morador() {
  const [list, setList] = useState([]);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    sexo: "",
    data_nascimento: "",
    proprietario_casa: false,
  });

  useEffect(() => {
    const lista = async () => {
      const list = await listar_moradores();
      if (list) setList(list.data);
      console.log(list.data);
    };
    lista();
  }, []);

  const atualizarCampo = (id, campo, valor) => {
    setList((prev) =>
      prev.map((m) => (m._id === id ? { ...m, [campo]: valor } : m))
    );
  };

  const atualizarForm = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };



  const editarMorador = async (morador) => {
    alert(`Editar morador: ${morador._id}`);
    const resposta = await editar(
      morador._id,
      morador.nome,
      morador.cpf,
      morador.data_nascimento,
      morador.sexo,
      morador.telefone,
      morador.proprietario_casa
    );

    if (resposta.sucesso) {
      alert("Morador atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar: " + resposta.mensagem);
    }
  };

const excluirMorador = async (id) => {
  const confirmar = window.confirm("Tem certeza que deseja excluir este morador?");
  if (!confirmar) return;

  const resposta = await deletar_morador(id);

  if (resposta.sucesso) {
    alert("Morador excluído com sucesso!");
    setList((prev) => prev.filter((m) => m._id !== id));
  } else {
    alert("Erro ao excluir: " + resposta.mensagem);
  }
};


  const enviarCadastro = async (e) => {
    e.preventDefault();

    const resposta = await cadastrar_morador(form);

    if (resposta.sucesso) {
      alert("Morador cadastrado com sucesso!");
    } else {
      alert("Erro ao cadastrar: " + resposta.mensagem);
    }
  };

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Moradores</h1>

        {list.map((morador) => (
          <form
            key={morador._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <Input
              type="text"
              text="Nome"
              value={morador.nome}
              onChange={(e) =>
                atualizarCampo(morador._id, "nome", e.target.value)
              }
            />

            <Input
              type="text"
              text="CPF"
              value={morador.cpf}
              onChange={(e) =>
                atualizarCampo(morador._id, "cpf", e.target.value)
              }
            />

            <Input
              type="text"
              text="Telefone"
              value={morador.telefone}
              onChange={(e) =>
                atualizarCampo(morador._id, "telefone", e.target.value)
              }
            />

            <Input
              type="text"
              text="Sexo"
              value={morador.sexo}
              onChange={(e) =>
                atualizarCampo(morador._id, "sexo", e.target.value)
              }
            />

            <Input
              type="date"
              text="Data de Nascimento"
              value={morador.data_nascimento?.slice(0, 10)}
              onChange={(e) =>
                atualizarCampo(morador._id, "data_nascimento", e.target.value)
              }
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                width: "90%",
              }}
            >
              <label>Proprietário da casa?</label>

              <select
                value={morador.proprietario_casa ? "true" : "false"}
                onChange={(e) =>
                  atualizarCampo(
                    morador._id,
                    "proprietario_casa",
                    e.target.value === "true"
                  )
                }
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <Button
                text="Editar"
                button_style={"btnEditar"}
                onClick={() => editarMorador(morador)}
              />

              <Button
                text="Excluir"
                button_style={"btnExcluir"}
                onClick={() => excluirMorador(morador._id)}
              />
            </div>
          </form>
        ))}
      </div>

      <div style={{ padding: "20px", width: "350px" }}>
        <h2>Cadastrar Morador</h2>

        <form onSubmit={enviarCadastro}>
          <Input
            type="text"
            text="Nome"
            value={form.nome}
            onChange={(e) => atualizarForm("nome", e.target.value)}
          />

          <Input
            type="text"
            text="CPF"
            value={form.cpf}
            onChange={(e) => atualizarForm("cpf", e.target.value)}
          />

          <Input
            type="text"
            text="Telefone"
            value={form.telefone}
            onChange={(e) => atualizarForm("telefone", e.target.value)}
          />

          <Input
            type="text"
            text="Sexo"
            value={form.sexo}
            onChange={(e) => atualizarForm("sexo", e.target.value)}
          />

          <Input
            type="date"
            text="Data de Nascimento"
            value={form.data_nascimento}
            onChange={(e) => atualizarForm("data_nascimento", e.target.value)}
          />

          <select
            value={form.proprietario_casa ? "true" : "false"}
            onChange={(e) =>
              atualizarForm("proprietario_casa", e.target.value === "true")
            }
            style={{ padding: "8px", marginTop: "5px" }}
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>

          <Button text="Cadastrar" button_style={"btnCadastrar"} />
        </form>
      </div>
    </>
  );
}
