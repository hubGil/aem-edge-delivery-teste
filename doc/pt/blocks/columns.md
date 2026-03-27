---
layout: doc
title: Columns
---

# Columns

## Objetivo

Aplicar comportamento visual a seções em colunas, principalmente conforme a quantidade de colunas e a presença de imagens.

## O que o JS faz

Este é um block leve. Ele:

- conta quantas colunas existem na primeira linha;
- adiciona uma classe como `columns-2-cols`, `columns-3-cols`, etc;
- identifica colunas cuja única informação é uma imagem;
- marca essas colunas com `.columns-img-col`.

## Por que isso importa

O CSS pode reagir melhor ao layout quando conhece:

- o número de colunas;
- quais colunas são predominantemente visuais.

## Ilustração simples

```text
[ texto ] [ imagem ]
   |
   +--> columns-2-cols
   +--> columns-img-col na coluna visual
```
