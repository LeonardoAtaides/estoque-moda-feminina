# 🛍️ StockFashion

## Sobre o Projeto

O **StockFashion** é uma aplicação web (desktop) desenvolvida com **Next.js**, **TypeScript** e **MySQL**, que permite ao usuário **criar, atualizar, deletar e visualizar produtos** dentro de um sistema de gerenciamento de estoque.

O sistema conta com:

* 📊 **Dashboard**: exibe dados e métricas sobre os produtos cadastrados
* 📦 **Página de Produtos**: permite busca, filtros e gerenciamento completo (CRUD) de forma prática e intuitiva

---

## ❗ Problema

O projeto foi desenvolvido para atender a necessidade de uma loja de moda feminina (a loja e da minha irmã) e não possuía um sistema de controle de estoque, realizando anotações manuais em papel.

Isso dificultava a organização e o controle dos produtos.
A aplicação foi criada para **resolver esse problema**, trazendo mais:

* organização
* praticidade
* controle eficiente do estoque

---

## ⚙️ Instalação
**para rodar está aplicação deve-se se obter node.js e MySql instalados em sua máquin a, passível de obter um software para gerenciar o banco de dados(Workbench e etc), apenas para cria-lo**

### 1. Clone o repositório

```bash
git clone https://github.com/LeonardoAtaides/estoque-moda-feminina.git
cd estoque-moda-feminina
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configurar o banco de dados

Crie um banco no MySQL:

```sql
create database inventory;
```

Depois, crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/NOME_DO_BANCO"
```

---

### 4. Conectar e preparar o banco

Execute os comandos:

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

Isso irá:

* Criar as tabelas
* Gerar o client do Prisma
* Inserir dados iniciais (seed)

---

## ▶️ Executar o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

Após cadastrar produtos, o **Dashboard será automaticamente atualizado**.

---

## 🧪 Testes

```bash
npm run test
```

---

## 🧹 Lint

```bash
npm run lint
```

---

## 🚀 Tecnologias Utilizadas

* Next.js
* TypeScript
* MySQL
* Tailwind CSS
* Prisma ORM
* Jest

---

## 🔮 Melhorias Futuras

* Interface mais avançada
* Pop-ups de confirmação
* Responsividade para outros dispositivos
* Upload de imagens nos produtos
* Mais métricas no Dashboard

---

## 📌 Versão

**1.0.1**

---

## 👨‍💻 Autor

Leonardo Ataídes
