# 🛍️ StockFashion

> Sistema de gerenciamento de estoque para moda feminina, focado em praticidade, organização e controle eficiente.
Link do Deploy: https://estoque-moda-feminina.vercel.app
---

## 📖 Sobre o Projeto

O **StockFashion** é uma aplicação web (desktop) desenvolvida com **Next.js**, **TypeScript** e **MySQL**, que permite gerenciar produtos de forma completa através de operações de **CRUD** (criar, visualizar, atualizar e deletar).

A aplicação foi pensada para ser **simples, intuitiva e funcional**, atendendo pequenas lojas que precisam de um controle eficiente sem complexidade.

## Integração com API Pública

O sistema consome dados da API pública DummyJSON para simular tendências do mercado da moda feminina. Os produtos são carregados dinamicamente e utilizados para representar novidades, itens em destaque e possíveis tendências do próximo semestre.

## Hospedagem

O banco de dados está hospedado na plataforma da Hostgator, Back-end e Front-end estão na plataforma da Versel

---

## 🎯 Objetivo

O projeto surgiu para resolver um problema real de um **parente próximo**, que possui uma loja de moda feminina e não contava com um sistema de controle de estoque, realizando o gerenciamento manualmente em papel.

Com isso, o StockFashion proporciona:

* 📦 Organização do estoque
* ⚡ Agilidade no gerenciamento
* 📊 Visualização clara dos dados
* ✅ Redução de erros manuais

---

## 🖥️ Funcionalidades

### 📊 Dashboard

* Exibição de métricas e dados dos produtos cadastrados
* Atualização automática conforme novos produtos são adicionados

### 📦 Produtos

* Listagem completa de produtos
* Busca e filtros
* Criação de novos produtos
* Edição de produtos existentes
* Exclusão de produtos

---

## 🚀 Tecnologias Utilizadas

* **Next.js**
* **TypeScript**
* **MySQL**
* **Prisma ORM**
* **Tailwind CSS**
* **Jest** (testes)

---

## ⚙️ Pré-requisitos para rodar Localmente

Para rodar o projeto, é necessário ter instalado:

* Node.js (versão 18 ou superior)
* MySQL (rodando localmente)
* Um gerenciador de banco (opcional, ex: MySQL Workbench)

---

## 📦 Instalação

### 1. Clone o repositório

```bash id="52yrh8"
git clone https://github.com/LeonardoAtaides/estoque-moda-feminina.git
cd estoque-moda-feminina
```

---

### 2. Instale as dependências

```bash id="aeys1c"
npm install
```

---

### 3. Configuração do banco de dados

Crie um banco no MySQL:

```sql id="9uoypm"
create database estoque_mf;
```

Crie um arquivo `.env` na raiz do projeto:

```env id="izswj3"
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/NOME_DO_BANCO"
```

---

### 4. Setup do banco (Prisma)

Execute:

```bash id="ey2htr"
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

Isso irá:

* Criar as tabelas
* Gerar o Prisma Client
* Inserir dados iniciais no banco

---

## ▶️ Executando o projeto

```bash id="bdz85p"
npm run dev
```

Acesse no navegador:

```id="40qbtu"
http://localhost:3000
```

---

## 🧪 Testes

```bash id="msaw5k"
npm run test
```

---

## 🧹 Lint

```bash id="y5rs4u"
npm run lint
```

---

## 📁 Estrutura do Projeto

```id="23z1ls"
src/
 ├── app/api/products
 ├── lib/prisma

tests/
```

---

## 🔮 Melhorias Futuras

* Interface mais avançada (UI/UX)
* Sistema de notificações (pop-ups)
* Responsividade para mobile
* Upload de imagens para produtos
* Dashboard com mais métricas e gráficos

---

## 📌 Versão

**1.0.1**

---

## 👨‍💻 Autores
**Leonardo Ataídes dos Santos** RA: 22604332
**João Gabriel Souto** RA: 22552119
**Pabllo Batista Morais da Costa** RA: 22510053

---

## 🔗 Link do Repositório

https://github.com/LeonardoAtaides/estoque-moda-feminina



