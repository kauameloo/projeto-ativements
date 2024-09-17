import React, { useContext, useEffect, useState } from "react";
import { Input, Select } from "../Input";
import { Button, ButtonTrasparent } from "../Button";
import context from "../../Context/userContext";

import { v4 as uuid } from "uuid";

export const FormAccess = ({ textButton, value, onChange, onSubmit, load }) => {
  return (
    <form onSubmit={onSubmit} action="" className="w-[40%]">
      <Input id="camporegistro" value={value} onChange={onChange}>
        Usuário de acesso
      </Input>

      <Button load={load} styles="w-full mt-4">
        {textButton}
      </Button>
    </form>
  );
};

export const FormAtivement = ({ list, setList, places, setPlaces, update }) => {
  const { user } = useContext(context);
  const [ativement, setAtivement] = useState({
    nome: "",
    numero: "",
    local: "",
  });

  // Quando houver uma mudança nos dados do update, vamos passar os valores para o ativement
  useEffect(() => {
    const local = places.filter((x) => x.id === update.local);

    if (local[0]) {
      // o local = filtro de locais com o id do local do ativo a ser atualizado, onde retornamos somente o nome
      setAtivement({
        ...update,
        local: local[0].nome,
      });
    }
  }, [update]);

  const clearInput = () => {
    setAtivement({ nome: "", numero: "", local: "" });
  };

  const updateAtivement = async () => {
    try {
      // Procurar pelo local informado
      const localid = await findLocal(ativement.local);

      const data = {
        ...ativement,
        local: localid,
        dataAlteracao: new Date().toLocaleString(),
        usuarioAlteracao: user.id,
      };

      fetch("http://localhost:3000/ativos/" + ativement.id, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      // Atualizar na lista de visualização, os novos dados do ativo
      setList(list.map((item) => (item.id === ativement.id ? data : item)));
    } catch (error) {
      alert("Não foi possível atualizar os dados do ativo");
    }
  };

  const validateData = async (e) => {
    e.preventDefault();

    // Armazenando a validação do número do ativo
    const numeroEmUso = await validateNumberAtivement();
    // Verificar se os campos estão vazios (mesmo com espaços)
    if (ativement.nome.trim() == "" || ativement.local.trim() == "") {
      alert("Preencha todos os campos!");
    } else if (ativement.numero.length != 7) {
      // Limite de caracteres para o numero do ativo == 7
      alert(
        "Numeração do ativo com tamanho inválido, favor utilizar somente 7 caracteres"
      );
    } else if (ativement.nome.length < 2) {
      // Limite de caracteres para o nome do ativo > 2
      alert("Nome do ativo deve ter no mínimo 2 caracteres");
    } else if (
      /[!@#\$%\^\&*\)\(+=._-]+/.test(ativement.nome) ||
      /[!@#\$%\^\&*\)\(+=._-]+/.test(ativement.local)
    ) {
      // Verificar se o item contem caracteres especiais
      alert("Nome e local do ativo não podem conter caracteres especiais");
    } else if (numeroEmUso && !ativement.id) {
      // Verificar se o numero do ativo não é repetido e nao estou alterando o meu ativo
      alert("O número do ativo já está cadastrado, informe outro código");
    } else {
      // Se não existir o id ativo, ele cadastra
      if (!ativement.id) {
        createAtivement();
      } else {
        // se houver, ele atualiza
        updateAtivement();
      }
    }
  };

  const validateNumberAtivement = () => {
    return fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
      .then((response) => response.json())
      .then((response) => {
        if (response[0]) {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  };

  const createAtivement = async (event) => {
    // Validar se o local existe, ou se precisa cadastrar
    const localId = await findLocal(ativement.local);

    try {
      const data = {
        ...ativement,
        local: localId,
        id: uuid(),
        dataRegistro: new Date().toLocaleString(),
        usuario_id: user.id,
        status: true,
      };

      fetch("http://localhost:3000/ativos", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setList([...list, data]);
    } catch (error) {
      alert("Não foi possível registrar o ativo");
    }
  };

  const findLocal = (local) => {
    return fetch("http://localhost:3000/locais?nome=" + local)
      .then((response) => response.json())
      .then(async (response) => {
        // Se não tiver um item no banco, registrar um novo local
        if (response.length === 0) {
          return await createLocal(local);
        } else {
          //Caso ele exista, retorne o id do local
          return response[0].id;
        }
      })
      .catch(() => {
        alert("Não foi possível encontrar o local");
      });
  };

  const createLocal = (local) => {
    try {
      const data = {
        id: uuid(),
        nome: local,
      };

      fetch("http://localhost:3000/locais", {
        method: "POST",
        body: JSON.stringify(data),
      });

      //   Insere nas tabs o novo local cadastrado
      setPlaces([...places, data]);

      return data.id;
    } catch (error) {
      alert("Não foi possível registrar o novo local");
    }
  };
  return (
    <form
      onSubmit={validateData}
      className="bg-[#D9D3F6] w-full py-5 px-10 mt-2 rounded flex justify-evenly items-end shadow-md"
    >
      <Input
        disabled={!!ativement.id}
        type="number"
        id="numeroativo"
        styles="w-[20%] md:text-xs lg:text-base"
        value={ativement.numero}
        onChange={(e) => setAtivement({ ...ativement, numero: e.target.value })}
      >
        Número do ativo
      </Input>

      <Input
        id="nomeativo"
        type="text"
        styles="w-[20%] md:text-xs lg:text-base"
        value={ativement.nome}
        onChange={(e) => setAtivement({ ...ativement, nome: e.target.value })}
      >
        Nome do ativo
      </Input>

      <Select
        id="localativo"
        styles="w-[20%] md:text-xs lg:text-base"
        value={ativement.local}
        places={places}
        onChange={(e) => setAtivement({ ...ativement, local: e.target.value })}
      >
        Local do ativo
      </Select>

      <ButtonTrasparent
        onClick={clearInput}
        styles="lg:w-[15%] md:p-2 lg:w-[15%] md:text-xs lg:text-base text-primary-blue border-primary-blue"
      >
        Limpar campos
      </ButtonTrasparent>

      <Button styles="md:w-[17%] lg:w-[15%] md:text-xs lg:text-base">
        Inserir ativo
      </Button>
    </form>
  );
};
