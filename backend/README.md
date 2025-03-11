# Backend - Teste Desenvolvedor MPlan – To Do (Node, PostgreSQL)

## 1. Tecnologias
- **Backend:** Node.js, Express, Sequelize, PostgreSQL

## 2. Necessário
- Node.js v16+  
- PostgreSQL (instalado e em execução localmente)

## 3. Configuração do Banco de Dados
1. Crie um banco de dados, por exemplo: `mplan_todo`.
2. Dentro da pasta `backend`, renomeie o arquivo `.env.example` para `.env` e ajuste as seguintes variáveis conforme sua configuração local:
   ```env
   DB_USER=peterson
   DB_PASS=1234
   DB_NAME=todo_mplan
   DB_HOST=127.0.0.1
   DB_DIALECT=postgres
   DB_PORT=5432
3. No terminal, execute `npx sequelize-cli db:migrate`.

## 4. Rodar o Backend
- Navegue até a pasta backend e execute:
 `cd backend`
 `npm install`
 `npm start`

Isso iniciará o servidor utilizando o Nodemon.
