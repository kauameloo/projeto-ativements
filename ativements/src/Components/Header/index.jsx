import React, { useContext, useEffect } from "react";

import context from "../../Context/userContext";

import { useNavigate } from "react-router-dom";

import logomarca from "../../Assets/logomarca_dark.png";

import { FaPowerOff } from "react-icons/fa";

import { ButtonTrasparent } from "../Button";

const Header = () => {
  const { user } = useContext(context); //Buscando dentro do contexto os dados do usuário logado

  const navigate = useNavigate();

  const logoutUser = () => {
    try {
      const data = {
        ...user,
        ultimoAcesso: new Date().toLocaleString(),
      };
      fetch("http://localhost:3000/usuarios/" + user.id, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="w-full flex justify-between items-center py-6 mt-3">
      <img src={logomarca} alt="" />

      <div className="flex justify-center items-center gap-5">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://github.com/${user.login}`}
          title={`Acessar o perfil do ${user.login} no GitHub`}
        >
          <img
            src={user.image}
            alt="Foto de perfil do usuário logado"
            className="w-12 rounded"
          />
        </a>

        <ButtonTrasparent onClick={logoutUser} styles="border-primary-red ">
          <FaPowerOff fill="#bf0000" />
        </ButtonTrasparent>
      </div>
    </header>
  );
};

export default Header;
