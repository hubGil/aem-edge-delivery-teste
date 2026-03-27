---
layout: doc
title: Como instalar
---

# Como instalar

## Pré-requisitos

- Node.js instalado.
- `npm` disponível no terminal.
- Repositório clonado localmente.
- Permissão para usar o GitHub App `aem-code-sync` no repositório.

## Instalação local

```bash
npm install
```

## Subir o ambiente local

```bash
npx -y @adobe/aem-cli up --no-open --forward-browser-logs
```

O projeto sobe em `http://localhost:3000`.

## Comando equivalente com CLI global

```bash
npm install -g @adobe/aem-cli
aem up
```

## Fluxo recomendado no dia a dia

```bash
npm install
npx -y @adobe/aem-cli up --no-open --forward-browser-logs
npm run lint
```

## O que acontece quando o projeto sobe

```text
localhost:3000
  -> usa seu código local
  -> busca conteúdo do ambiente de preview
  -> aplica decoração no navegador
```

## Validar antes de subir alterações

```bash
npm run lint
```

Se quiser aplicar correções automáticas quando possível:

```bash
npm run lint:fix
```

## Pastas que você mais vai usar

| Pasta | Papel |
| --- | --- |
| `blocks/` | components do site |
| `scripts/` | fluxo global de carregamento |
| `styles/` | estilos globais |
| `doc/` | documentação do projeto |
| `paths.json` | mapeamento entre conteúdo e URL |

## Dica de debug

Você pode inspecionar o HTML entregue pelo backend:

```bash
curl http://localhost:3000/caminho/da/pagina
curl http://localhost:3000/caminho/da/pagina.plain.html
curl http://localhost:3000/caminho/da/pagina.md
```
