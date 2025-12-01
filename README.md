Hotéis para Animais

Sistema para gestão de tutores e animais desenvolvido com React, TypeScript e Vite.

Tecnologias utilizadas

React 19 com TypeScript

Vite como ferramenta de construção

React Router para gerenciamento de rotas

React Hook Form para formulários

Axios para requisições HTTP

TailwindCSS para estilização

Context API com useReducer para gerenciamento de estado

json-server para simulação de API durante o desenvolvimento

Funcionalidades

Autenticação baseada em token

CRUD completo de tutores

CRUD completo de animais

Rotas públicas e privadas

Validação de formulários

Sistema de notificações (Toast)

Layout responsivo


Instalação
Instalar dependências
npm install

Iniciar servidor de desenvolvimento (frontend)
npm run dev

Iniciar API mock (em outro terminal)
npm run server


Implantação
Opção 1: Vercel (recomendado)

Envie o código para o GitHub

Acesse o site da Vercel

Conecte o repositório

Configure a variável de ambiente:

VITE_API_URL: URL da sua API (exemplo: https://sua-api.railway.app
)

Publique o projeto com implantação automática

Opção 2: Netlify

Envie o código para o GitHub

Acesse o Netlify

Conecte o repositório

Configure:

Comando de build: npm run build

Diretório publicado: dist

Variável de ambiente: VITE_API_URL

Backend (API)

Para o backend, você pode usar serviços gratuitos como:

Railway

Render

Cyclic

Ou desenvolver uma API real utilizando Node.js/Express, Python/Flask ou outra tecnologia semelhante.

Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

VITE_API_URL=http://localhost:3000


Para produção, utilize a URL da API hospedada.

Credenciais de Acesso

E-mail: admin@animalhotels.com
Senha: 123456

Scripts Disponíveis

npm run dev: inicia o servidor de desenvolvimento

npm run build: gera o build de produção

npm run server: sobe o json-server

npm run preview: visualiza o build de produção

npm run lint: executa o linter

Estrutura do Projeto
src/
├── api/           # Configurações da API
├── components/    # Componentes reutilizáveis
├── context/       # Context API (autenticação)
├── pages/         # Páginas da aplicação
├── router/        # Configuração das rotas
└── types/         # Tipos TypeScript

Requisitos

Node.js 20.19 ou superior, ou 22.12+

npm ou yarn instalado
