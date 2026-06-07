# Projeto Didi Piscinas

Sistema web desenvolvido para a disciplina de Programas para Internet da FATEC Itu, utilizando React, Vite, Tailwind CSS e Supabase.

## Objetivo

O sistema foi desenvolvido para auxiliar no gerenciamento de solicitações de orçamentos da empresa Didi Piscinas, permitindo o cadastro de usuários, autenticação e armazenamento dos pedidos realizados pelos clientes.

O objetivo é centralizar as informações em um único ambiente, facilitando o controle e o atendimento das solicitações.

---

## Funcionalidades

### Autenticação

* Cadastro de usuários
* Login de usuários
* Controle de acesso à área administrativa

### Gerenciamento de Orçamentos

* Cadastro de novos orçamentos
* Visualização dos orçamentos cadastrados
* Exclusão de registros
* Estrutura preparada para edição de registros

### Site Institucional

* Página inicial
* Sobre a empresa
* Área de atendimento
* Serviços oferecidos
* Diferenciais da empresa
* Depoimentos de clientes
* Galeria de fotos
* Formulário de orçamento
* Botão de contato via WhatsApp

---

## Tecnologias Utilizadas

* React
* Vite
* Tailwind CSS
* JavaScript
* HTML5
* CSS3
* Supabase
* GitHub Pages

---

## Estrutura do Banco de Dados

### Tabela: usuarios

| Campo      | Tipo      |
| ---------- | --------- |
| id         | bigint    |
| email      | text      |
| senha      | text      |
| created_at | timestamp |

### Tabela: orcamentos

| Campo        | Tipo      |
| ------------ | --------- |
| id           | bigint    |
| nome         | text      |
| telefone     | text      |
| email        | text      |
| endereco     | text      |
| cidade       | text      |
| bairro       | text      |
| tipo_servico | text      |
| mensagem     | text      |
| origem       | text      |
| created_at   | timestamp |

---

## SQL Utilizado

```sql
create table usuarios (
  id bigint generated always as identity primary key,
  email text,
  senha text,
  created_at timestamp default now()
);

create table orcamentos (
  id bigint generated always as identity primary key,
  nome text,
  telefone text,
  email text,
  endereco text,
  cidade text,
  bairro text,
  tipo_servico text,
  mensagem text,
  origem text,
  created_at timestamp default now()
);
```

---

## Observações

A funcionalidade de edição de registros foi iniciada e a estrutura necessária foi implementada no sistema, mas, durante a fase final de desenvolvimento foram identificados ajustes pendentes para seu funcionamento completo.

As funcionalidades de cadastro, autenticação, consulta e exclusão encontram-se operacionais.

---

## Publicação (Projeto Online)

https://milene-costa25.github.io/didi-piscinas/

### GitHub

https://github.com/milene-costa25/didi-piscinas





---


