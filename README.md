# 🛡️ VHSYS Sentinel — Frontend

Real-time Observability • Task Management • Operational Dashboard

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Este repositório contém o frontend do **VHSYS Sentinel**, um painel minimalista em dark mode pensado para equipes de engenharia que precisam de observabilidade em tempo real e controle de tarefas integrado a uma API backend.

Resumo rápido:

- Interface React + Vite com componentes reutilizáveis
- Hooks customizados para encapsular lógica assíncrona
- Comunicação com API REST (envelope BaseResponse)
- Paginação nativa suportada pelo backend (Spring Data)

---

## Recursos Principais

- Observabilidade em tempo real (checagens de saúde)
- Gerenciamento de tasks (CRUD) com paginação
- Tratamento padronizado de respostas da API
- UI responsiva e minimalista baseada em Tailwind CSS
- Testes unitários com Vitest (hooks e modelos)

---

## Arquitetura (visão rápida)

- `services/` — chamadas HTTP e normalização de payloads
- `hooks/` — lógica de negócio, cache local e controle de paginação
- `components/` — UI atômica e modais reutilizáveis
- `pages/` — telas compostas

---

## Requisitos

- Node.js 18+ (recomendado)
- Backend Task API rodando (por padrão: `http://localhost:8080`)

### Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## Instalação

```bash
npm install
```

## Execução (desenvolvimento)

```bash
npm run dev
```

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm test` — roda a suíte de testes (Vitest)
- `npm run build` — gera a build de produção

---

## Como contribuir

1. Fork do repositório
2. Crie uma branch de feature: `git checkout -b feat/my-change`
3. Faça alterações e adicione testes quando fizer sentido
4. Abra um Pull Request descrevendo a motivação e mudanças

---

## Notas de integração com o Backend

O backend expõe endpoints paginados compatíveis com Spring Data (`page`, `size`). O hook `useTasks` já suporta navegação por páginas — ajuste `VITE_API_URL` caso sua API esteja em outra origem.

---

## Autor

Erick Tarzia — Staff Software Engineer

Links:

- https://github.com/ericktarzia

---
