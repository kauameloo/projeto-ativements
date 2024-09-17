import React, { useEffect, useState, useContext } from "react";

import context from "../../Context/userContext";

import { useNavigate } from "react-router-dom";

import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";

export const Login = ({ onLinking }) => {
  const { setUser } = useContext(context); // importando dentro do contexto a função de alimentar os dados do usuário

  const navigate = useNavigate();

  const [userAccess, setUserAcces] = useState("");

  const [message, setMessage] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setUser({}); // Limpando o acesso do usuário no context
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  });

  const verifyAccess = (e) => {
    setLoad(true);

    e.preventDefault();

    fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
      .then((response) => response.json())
      .then((response) => {
        if (response[0]) {
          setUser(response[0]); //Alimenta os dados do user para o context da aplicação
          navigate("/painel-ativos");
        } else {
          setMessage("Usuário não encontrado!");
        }
      })
      .catch(() =>
        setMessage("Não foi possível efetuar o login, tente novamente!")
      );

    setLoad(false);
    setUserAcces("");
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8">
      <Title>Entrar na plataforma</Title>

      <Paragraph styles="w-[55%]">
        Para acessar sua conta, informe seu usuário de acesso vínculado ao
        Github
      </Paragraph>

      {/* {Formulário de acesso} */}
      <FormAccess
        load={load}
        value={userAccess}
        onChange={(e) => setUserAcces(e.target.value)}
        onSubmit={verifyAccess}
        textButton={"Acessar conta"}
      />

      {/* Exibindo as mensagens de erro */}
      <TextError>{message}</TextError>

      {/* O onLinking - alimentando o state para o container de gradient - vai para o click do botão de link */}
      <Paragraph>
        Seu primeiro acesso?
        <ButtonLink onClick={onLinking}>registre-se aqui</ButtonLink>
      </Paragraph>
    </section>
  );
};
