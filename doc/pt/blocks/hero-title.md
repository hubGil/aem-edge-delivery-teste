---
layout: doc
title: Hero e Title
---

# Hero e Title

## Estado atual

Os blocks `hero` e `title` existem no projeto, mas hoje têm implementação JS mínima.

## Hero

O comportamento real do `hero` hoje vem principalmente do auto-block em `scripts/scripts.js`.

Quando o pipeline encontra:

- um `picture`;
- seguido de um `h1`;

ele cria automaticamente um block `hero`.

## Fluxo simplificado

```text
picture + h1 no topo
  |
  v
buildHeroBlock(main)
  |
  v
section com block hero é criada
```

## Title

Existe a pasta do block, mas atualmente não há lógica relevante em produção no JS do projeto para montar esse block automaticamente.

## Leitura prática

- `hero` hoje é mais um ponto de extensão do que um block rico.
- `title` está reservado para evolução futura.

Ao documentar ou evoluir esses componentes, trate-os como placeholders estruturais.
