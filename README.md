# AnimalHotels 🐾

Sistema de gerenciamento de tutores e animais desenvolvido com React + TypeScript + Vite.

## 🚀 Tecnologias

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Roteamento
- **React Hook Form** - Formulários
- **Axios** - Requisições HTTP
- **TailwindCSS** - Estilização
- **Context API + useReducer** - Gerenciamento de estado
- **json-server** - API mock

## 📋 Funcionalidades

- ✅ Sistema de autenticação com token
- ✅ CRUD completo de Tutores
- ✅ CRUD completo de Animais
- ✅ Rotas públicas e privadas
- ✅ Validações de formulários
- ✅ Notificações (Toast)
- ✅ Responsivo

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (frontend)
npm run dev

# Iniciar API mock (em outro terminal)
npm run server
```

## 🌐 Deploy

### Opção 1: Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório
4. Configure a variável de ambiente:
   - `VITE_API_URL`: URL da sua API (ex: `https://sua-api.railway.app`)
5. Deploy automático!

### Opção 2: Netlify

1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Conecte seu repositório
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Variável de ambiente: `VITE_API_URL`

### Backend (API)

Para o backend, você pode usar:

- **Railway**: [railway.app](https://railway.app) - Gratuito
- **Render**: [render.com](https://render.com) - Gratuito
- **Cyclic**: [cyclic.sh](https://cyclic.sh) - Gratuito

Ou criar uma API real com Node.js/Express, Python/Flask, etc.

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

Para produção, use a URL da sua API hospedada.

## 🔐 Credenciais de Login

- **Email**: `admin@animalhotels.com`
- **Senha**: `123456`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run server` - Inicia json-server (API mock)
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 📁 Estrutura do Projeto

```
src/
├── api/           # Configuração da API
├── components/    # Componentes reutilizáveis
├── context/       # Context API (Auth)
├── pages/         # Páginas da aplicação
├── router/        # Configuração de rotas
└── types/         # Tipos TypeScript
```

## 🎯 Requisitos

- Node.js 20.19+ ou 22.12+
- npm ou yarn

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
