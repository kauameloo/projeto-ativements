import React, { useEffect, useState, useContext } from "react";

import context from "../../Context/userContext";

import { octokit } from "../../Utils/githubkey";

import { v4 as uuid } from "uuid";

import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";

import { useNavigate } from "react-router-dom";

export const Register = ({ onLinking }) => {

    const { setUser } = useContext(context)  // importando dentro do contexto a função de alimentar os dados do usuário

    const navigate = useNavigate()

    const [userAccess, setUserAcces] = useState("")

    const [message, setMessage] = useState("")

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (message) {
            setTimeout(() => { setMessage("") }, 5000)
        }
    })

    // Função para validar o perfil do github
    const validateUser = (e) => {

        e.preventDefault();

        setLoad(true)

        octokit.request("GET /users/{username}", {
            username: userAccess,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }).then(async response => {

            const verify = await checkUserExists();

            if (verify) {
                setMessage("Usuário já cadastrado!")
            } else {
                registerUser(response.data)
            }

        }).catch(() => {
            setMessage("Usuário inválido, tente novamente!")
            setUserAcces("")

        })

        setLoad(false)
    }

    //Função para verificar se o usuário já está registrado
    const checkUserExists = () => {
        return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLocaleLowerCase()}`).then(response => response.json()).then(response => {
            if (response.length > 0) {
                return true;
            }

            return false

        }).catch(() => {
            alert("Não foi possível consultar o usuário")
            setUserAcces("")

        })
    }

    // Função para registrar o usuário
    const registerUser = (user) => {
        try {
            const data = {
                id: uuid(),
                login: user.login.toLocaleLowerCase(),
                image: user.avatar_url
            }

            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                body: JSON.stringify(data)
            })

            setUser(data)

            navigate("/painel-ativos")

        } catch (error) {
            setMessage("Não foi possível registrar o usuário, tente novamente!")
            setUserAcces("")

        }
    }

    return (

        <section className="flex flex-1 flex-col items-center justify-center gap-8 ">

            <Title>
                Registrar-se na plataforma
            </Title>

            <Paragraph styles="w-[55%]">
                Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github
            </Paragraph>

            {/* {Formulário de acesso} */}
            <FormAccess
                load={load}
                value={userAccess}
                onChange={e => setUserAcces(e.target.value)}
                onSubmit={validateUser}
                textButton={"Cadastrar conta"}
            />

            {/* Exibindo as mensagens de erro */}
            <TextError>{message}</TextError>

            {/* O onLinking - alimentando o state para o container de gradient - vai para o click do botão de link */}
            <Paragraph>Já possui registro?<ButtonLink onClick={onLinking}>acessar conta</ButtonLink></Paragraph>

        </section>

    )
}