---
layout: doc
title: Arquitetura do projeto
---

# Arquitetura do projeto

## Pastas principais

```text
blocks/
  <block>/<block>.js
  <block>/<block>.css

scripts/
  aem.js
  scripts.js
  delayed.js

styles/
  styles.css
  lazy-styles.css
  fonts.css
```

## Papel de `scripts/scripts.js`

`scripts/scripts.js` é a entrada principal do front-end. Ele:

- decora ícones e estrutura global;
- cria auto-blocks;
- decora seções;
- decora blocks encontrados no HTML;
- transforma links formatados em botões;
- controla o carregamento em fases.

## Três fases de carregamento

### 1. Eager

Carrega o que é crítico para o primeiro render:

- template e theme;
- decoração do `main`;
- primeira section;
- imagens críticas;
- fontes em alguns cenários.

### 2. Lazy

Carrega o restante da página:

- header;
- footer;
- sections restantes;
- `lazy-styles.css`.

### 3. Delayed

Carrega o que pode esperar:

- `scripts/delayed.js`.

## Fluxo da página

```text
loadPage()
  |
  +-- loadEager()
  |
  +-- loadLazy()
  |
  +-- loadDelayed()
```

## Auto-blocks atuais

Hoje o projeto cria automaticamente:

- `hero`, quando encontra `picture` antes do `h1`;
- `fragment`, quando encontra links para `/fragments/`.

## Como um block entra em cena

```text
HTML autorado chega no main
  |
  v
decorateSections() marca seções
  |
  v
decorateBlocks() identifica classes de blocks
  |
  v
import dinâmico do JS/CSS do block
  |
  v
decorate(block) transforma o DOM
```

## Relação entre CSS global e CSS de block

- `styles/styles.css`: base visual e regras críticas.
- `styles/lazy-styles.css`: estilos não críticos.
- `blocks/<nome>/<nome>.css`: estilo específico do componente.

## Fragmentos estruturais

- `header` e `footer` usam metadata para descobrir o caminho do conteúdo.
- `fragment` busca `.plain.html`, reprocessa o conteúdo e reaplica o mesmo pipeline de decoração.

## Como ler o projeto

Se você quiser entender um block de ponta a ponta, a ordem mais útil é:

1. olhar o HTML autorado;
2. ler o `decorate()` do block;
3. ver o CSS do block;
4. testar a página em `localhost:3000`.
