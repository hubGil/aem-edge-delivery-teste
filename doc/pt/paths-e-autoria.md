---
layout: doc
title: paths.json e autoria
---

# `paths.json` e autoria

O arquivo `paths.json` define quais caminhos de conteúdo entram no projeto e como alguns endpoints específicos são expostos.

## Arquivo atual

```json
{
  "mappings": [
    "/content/aem-edge-delivery-teste/:/",
    "/content/aem-edge-delivery-teste/standings:/standings.json"
  ],
  "includes": [
    "/content/aem-edge-delivery-teste/**"
  ]
}
```

## O que cada parte faz

### `includes`

Define o conjunto de conteúdo que o projeto aceita publicar.

```text
/content/aem-edge-delivery-teste/**
```

Tudo que estiver fora desse tronco não faz parte do escopo do site.

### `mappings`

Define como o caminho do conteúdo aparece no site.

#### Mapeamento principal

```text
/content/aem-edge-delivery-teste/:/
```

Isso conecta o conteúdo base do projeto com a raiz pública do site.

Exemplo conceitual:

```text
/content/aem-edge-delivery-teste/home  ->  /home
```

#### Endpoint de dados

```text
/content/aem-edge-delivery-teste/standings:/standings.json
```

Esse mapeamento expõe um conteúdo específico como JSON em `/standings.json`.

## Como isso conversa com os components

O block `standings` pode buscar uma origem de dados JSON. Esse tipo de mapeamento permite publicar um caminho autorável e consumi-lo como endpoint de dados no front-end.

Fluxo:

```text
Conteúdo autorado em /content/aem-edge-delivery-teste/standings
  |
  v
paths.json expõe isso em /standings.json
  |
  v
blocks/standings/standings.js faz fetch da origem configurada
  |
  v
Tabela e lista de partidas são renderizadas
```

## Relação com autoria

Quando o autor cria conteúdo:

- ele precisa usar caminhos cobertos por `includes`;
- a URL final depende de `mappings`;
- blocks orientados a dados podem consumir endpoints publicados por esses mappings.

## Quando editar `paths.json`

Edite `paths.json` quando:

- um novo tronco de conteúdo precisar entrar no projeto;
- um endpoint JSON específico precisar ser exposto;
- a URL pública precisar mudar.

## Cuidados

- Não crie mappings redundantes.
- Mantenha o caminho de autoria estável.
- Documente qualquer endpoint novo consumido por block.
- Sempre valide localmente o caminho final exposto.
