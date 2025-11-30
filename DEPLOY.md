# 🚀 Guia de Deploy - AnimalHotels

## Passo a Passo para Deploy

### 1️⃣ Preparar o Repositório Git

```bash
cd animal-hotels
git init
git add .
git commit -m "Initial commit: AnimalHotels project"
```

### 2️⃣ Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `animal-hotels`
4. Público ou Privado (sua escolha)
5. **NÃO** marque "Initialize with README"
6. Clique em "Create repository"

### 3️⃣ Fazer Push para GitHub

```bash
git remote add origin https://github.com/SEU_USUARIO/animal-hotels.git
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy do Frontend na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `animal-hotels`
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (deixe padrão)
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `dist` (já vem preenchido)
6. Clique em "Deploy"

### 5️⃣ Deploy do Backend (API)

#### Opção A: Railway (Recomendado - Gratuito)

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha o repositório `animal-hotels`
6. Configure:
   - **Start Command**: `npx json-server db.json --port $PORT`
   - **Environment Variables**: Não precisa configurar nada
7. Railway vai gerar uma URL automática (ex: `https://animal-hotels-production.up.railway.app`)

#### Opção B: Render (Gratuito)

1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte o repositório
5. Configure:
   - **Name**: `animal-hotels-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install -g json-server`
   - **Start Command**: `json-server db.json --port $PORT`
   - **Plan**: Free
6. Clique em "Create Web Service"

### 6️⃣ Configurar Variável de Ambiente na Vercel

1. No projeto Vercel, vá em "Settings"
2. Clique em "Environment Variables"
3. Adicione:
   - **Name**: `VITE_API_URL`
   - **Value**: URL da sua API (ex: `https://animal-hotels-production.up.railway.app`)
4. Clique em "Save"
5. Vá em "Deployments" e faça um novo deploy (ou aguarde o redeploy automático)

### 7️⃣ Pronto! 🎉

Seu projeto estará disponível em:
- **Frontend**: `https://animal-hotels.vercel.app` (ou URL personalizada)
- **Backend**: URL do Railway/Render

## 🔧 Alternativa: Deploy Full-Stack em um único serviço

Se quiser simplificar, você pode:

1. **Netlify Functions** - Criar uma API serverless
2. **Vercel Serverless Functions** - API serverless
3. **Supabase** - Backend completo gratuito

## 📝 Notas Importantes

- O json-server é apenas para desenvolvimento/mock
- Para produção, considere criar uma API real
- A variável `VITE_API_URL` deve apontar para sua API em produção
- Certifique-se de que a API permite CORS do seu frontend

## 🆘 Problemas Comuns

**CORS Error**: Adicione headers CORS na sua API ou use um proxy

**API não funciona**: Verifique se a URL está correta e se a API está rodando

**Build falha**: Verifique se todas as dependências estão no `package.json`

