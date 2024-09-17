# Gerenciamento de Ativos

Este projeto é uma solução de gerenciamento de ativos, desenvolvido para facilitar o controle, acompanhamento e visualização de recursos dentro de uma organização. Utilizando um conjunto moderno de tecnologias, a aplicação é escalável, flexível e fácil de usar.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **Azure DevOps**: Para integração contínua, deploy automatizado e gerenciamento de pipelines.
- **ReactJS**: Framework de JavaScript para construção da interface de usuário.
- **Octokit**: Biblioteca para interação com a API do GitHub.
- **React Router Dom**: Gerenciamento de rotas dentro da aplicação React.
- **JSON Server**: API REST mock para simulação de dados e testes locais.
- **React Icons**: Biblioteca de ícones utilizados na interface.
- **UUID**: Para a geração de identificadores únicos.
- **Tailwind CSS**: Framework de CSS para estilização rápida e eficiente.
- **React Loader Spinner**: Componente de loading para melhorar a experiência do usuário.

## Funcionalidades Principais

- Gestão eficiente de ativos com possibilidade de criar, editar e excluir informações.
- Interface responsiva e de fácil navegação.
- Integração com APIs externas utilizando Octokit para funcionalidades relacionadas ao GitHub.
- Simulação de backend utilizando JSON Server para testes rápidos sem necessidade de um servidor real.
- Visualização em tempo real do status das operações, com uso de spinners para feedback do usuário.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/kauameloo/projeto-ativements.git

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o json-server
   ```bash
   cd src
   cd Database
   npx json-server -w server.json

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
