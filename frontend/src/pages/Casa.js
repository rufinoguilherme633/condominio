import { useEffect, useState } from "react";
import {
  listar_casas,
  editar_casa,
  deletar_casa,
  cadastrar_casa,
} from "../router/Casa";
import {
  listar_moradores,
  editar,
  cadastrar_morador,
  deletar_morador,
} from "../router/Morador";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import styles from "./Casa.modules.css"
export default function Casa() {
  const [list, setList] = useState([]);
  const [moradoresList, setMoradoresList] = useState([]);

  const [form, setForm] = useState({
    cep: "",
    cidade: "",
    logradouro: "",
    numero: "",
    complemento: "",
    moradores: [],
  });

  useEffect(() => {
    const carregarDados = async () => {
      const casasResp = await listar_casas();
      if (casasResp.sucesso) setList(casasResp.data);

      console.log(casasResp);
      const moradoresResp = await listar_moradores();
      if (moradoresResp.sucesso) setMoradoresList(moradoresResp.data);
      console.log(moradoresResp);
    };

    carregarDados();
  }, []);

  const atualizarCampo = (id, campo, valor) => {
    setList((prev) =>
      prev.map((casa) => (casa._id === id ? { ...casa, [campo]: valor } : casa))
    );
  };

  const atualizarForm = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };
  const editarCasa = async (casa) => {
    const resposta = await editar_casa(
      casa._id,
      casa.cep,
      casa.cidade,
      casa.logradouro,
      casa.numero,
      casa.complemento,
      casa.moradores
    );

    if (resposta.sucesso) {
      alert("Casa atualizada!");
    } else {
      alert("Erro ao atualizar: " + resposta.mensagem);
    }
  };

  // Função para excluir
  const excluirCasa = async (id) => {
    const confirmar = window.confirm("Deseja excluir esta casa?");
    if (!confirmar) return;

    const resposta = await deletar_casa(id);

    if (resposta.sucesso) {
      alert("Casa excluída!");
      setList((prev) => prev.filter((c) => c._id !== id));
    } else {
      alert("Erro ao excluir: " + resposta.mensagem);
    }
  };

  const enviarCadastro = async (e) => {
    e.preventDefault();

    const resposta = await cadastrar_casa(
      form.cep,
      form.cidade,
      form.logradouro,
      form.numero,
      form.complemento,
      form.moradores
    );

    if (resposta.sucesso) {
      alert("Casa cadastrada!");
    } else {
      alert("Erro ao cadastrar: " + resposta.mensagem);
    }
  };

  return (
    <>  
    <div className= {styles.mainContainer}>
    <h1>casa</h1>
      <div  className= {styles.leftList}>
        <h1>lista</h1>  
        {list.map((casa) => (
          <form
            key={casa._id}
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
              text="CEP"
              value={casa.cep}
              onChange={(e) => atualizarCampo(casa._id, "cep", e.target.value)}
            />

            <Input
              type="text"
              text="Cidade"
              value={casa.cidade}
              onChange={(e) =>
                atualizarCampo(casa._id, "cidade", e.target.value)
              }
            />

            <Input
              type="text"
              text="Logradouro"
              value={casa.logradouro}
              onChange={(e) =>
                atualizarCampo(casa._id, "logradouro", e.target.value)
              }
            />

            <Input
              type="text"
              text="Número"
              value={casa.numero}
              onChange={(e) =>
                atualizarCampo(casa._id, "numero", e.target.value)
              }
            />

            <label>Moradores</label>
            <select
              multiple
              value={casa.moradores}
              onChange={(e) =>
                atualizarCampo(
                  casa._id,
                  "moradores",
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
            >
              {moradoresList
                .filter((m) => casa.moradores.includes(m._id))
                .map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.nome}
                  </option>
                ))}
            </select>

            {/* 🔥 Botões de ação */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <Button
                text="Editar"
                button_style={"btnEditar"}
                onClick={() => editarCasa(casa)}
              />

              <Button
                text="Excluir"
                button_style={"btnExcluir"}
                onClick={() => excluirCasa(casa._id)}
              />
            </div>
          </form>
        ))}
      </div>
      <div className= {styles.rightForm}>
        <h2>Cadastrar Casa</h2>

        <form onSubmit={enviarCadastro}>
          <Input
            type="text"
            text="CEP"
            value={form.cep}
            onChange={(e) => atualizarForm("cep", e.target.value)}
          />

          <Input
            type="text"
            text="Cidade"
            value={form.cidade}
            onChange={(e) => atualizarForm("cidade", e.target.value)}
          />

          <Input
            type="text"
            text="Logradouro"
            value={form.logradouro}
            onChange={(e) => atualizarForm("logradouro", e.target.value)}
          />

          <Input
            type="text"
            text="Número"
            value={form.numero}
            onChange={(e) => atualizarForm("numero", e.target.value)}
          />

          <Input
            type="text"
            text="Complemento"
            value={form.complemento}
            onChange={(e) => atualizarForm("complemento", e.target.value)}
          />

          <label>Moradores</label>
          <select
            multiple
            value={form.moradores}
            onChange={(e) =>
              atualizarForm(
                "moradores",
                [...e.target.selectedOptions].map((opt) => opt.value)
              )
            }
            style={{ padding: "8px", height: "80px" }}
          >
            {moradoresList.map((m) => (
              <option key={m._id} value={m._id}>
                {m.nome}
              </option>
            ))}
          </select>

          <Button text="Cadastrar" button_style="btnCadastrar" />
        </form>
      </div>

      </div>
    </>
  );
}
