import React from "react";
import { ButtonTrasparent } from "../Button";

const Table = ({ list, setList, setUpdate }) => {
  const removeAtivement = (ativo) => {
    try {
      const data = {
        ...ativo,
        status: !ativo.status,
      };

      fetch("http://localhost:3000/ativos/" + ativo.id, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      // Procurando na lista o item que está sendo atualizado, caso o item seja encontrado
      // devolvemos o objeto com os dados atualizados para a lista, caso não, retornamos
      // apenas os itens que já e
      setList(list.map((item) => (item.id === ativo.id ? data : item)));
    } catch (error) {
      alert("Não foi possível remover o ativo informado");
    }
  };

  const getAtivement = (ativo) => {
    setUpdate(ativo);
  };

  return (
    <table className="w-full mt-10">
      <thead>
        <tr className="bg-[#e1e0e7]">
          <th className="py-5 px-10 text-left rounded-l md:text-xs lg:text-base">
            Identificação
          </th>
          <th className="py-5 px-10 text-left md:text-xs lg:text-base">
            Nome do ativo
          </th>
          <th className="py-5 px-10 text-left md:text-xs lg:text-base">
            Data de registro
          </th>
          <th className="py-5 px-10 text-left rounde-r md:text-xs lg:text-base">
            Ações do ativo
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => {
          return (
            <tr
              key={index}
              className="hover:bg-[#f1f0f5] hover:border-l-2 hover:border-primary-purple"
            >
              <td
                className={`py-5 px-10 text-left ${
                  !item.status && "line-through"
                } md:text-xs lg:text-base`}
              >
                {item.numero}
              </td>
              <td
                className={`py-5 px-10 text-left ${
                  !item.status && "line-through"
                } md:text-xs lg:text-base`}
              >
                {item.nome}
              </td>
              <td
                className={`py-5 px-10 text-left ${
                  !item.status && "line-through"
                } md:text-xs lg:text-base`}
              >
                {item.dataRegistro}
              </td>

              <td className="py-5 px-10 text-left flex gap-5">
                <ButtonTrasparent
                  onClick={(e) => getAtivement(item)}
                  styles="border-none py-0 px-0 text-[#009e9e] md:text-xs lg:text-base"
                >
                  Editar ativo
                </ButtonTrasparent>

                <ButtonTrasparent
                  onClick={(e) => removeAtivement(item)}
                  styles="border-none py-0 px-0 text-primary-red md:text-xs lg:text-base"
                >
                  Excluir ativo
                </ButtonTrasparent>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
