---
layout: doc
title: Chamadas à Admin API
---

# Chamadas à Admin API

## O que é

A [Admin API](https://www.aem.live/docs/admin.html) é o serviço HTTP da AEM Edge Delivery Services que guarda e gerencia a configuração de cada projeto: quem pode acessar o quê, de onde vem o conteúdo autorado, qual repositório de código está conectado, quais usuários existem, etc. É a mesma configuração que você define no passo "Finish setup" do AEM Code Sync (veja [Como instalar](/pt/instalacao)) ou pelo [AEM Configuration Manager](https://tools.aem.live/) — a Admin API é só uma forma de ler e alterar isso por chamadas HTTP em vez de por uma interface visual, útil para automatizar tarefas (ex.: criar vários projetos, ou adicionar um usuário em lote).

## Como funciona

Cada projeto é identificado por `{org}` (o dono do repositório no GitHub) e `{site}` (o nome do repositório) — os mesmos valores usados na URL do site (`https://<branch>--{site}--{org}.aem.page/`). A configuração fica guardada num documento JSON por projeto, que você lê com `GET` e altera com `POST`, enviando só os campos que quer mudar. Usuários são geridos numa lista separada, em `/config/{org}/users.json`.

Na prática, o fluxo é sempre:

1. Autenticar (veja abaixo).
2. Chamar `GET .../sites/{site}.json` para ver a configuração atual (opcional, mas útil antes de alterar algo).
3. Chamar `POST .../sites/{site}.json` (ou `.../users.json`) com o JSON só com os campos alterados.
4. Conferir a resposta — a Admin API devolve a configuração já atualizada.

## Autenticação

As chamadas abaixo exigem autenticação: um cookie de sessão obtido em `/login`, ou um header `authorization: token $API_KEY` (veja como gerar uma API key em [Admin API Keys](https://www.aem.live/docs/admin-apikeys)).

Em todos os exemplos, substitua:

- `{org}` — o dono do repositório no GitHub (organização ou usuário).
- `{site}` — o nome do repositório.
- `$API_KEY` — a API key gerada para o projeto.

## Configuração geral do projeto (site config)

### Consultar a configuração atual

```bash
curl -X GET "https://admin.hlx.page/config/{org}/sites/{site}.json" \
  -H "authorization: token $API_KEY"
```

### Alterar a configuração

```bash
curl -X POST "https://admin.hlx.page/config/{org}/sites/{site}.json" \
  -H "authorization: token $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nome do projeto",
    "description": "Descrição do projeto"
  }'
```

O `POST` faz um merge — só é preciso enviar os campos que estão sendo alterados. Alguns campos comuns da configuração:

| Campo | Descrição |
| --- | --- |
| `title` / `description` | Nome e descrição do projeto. |
| `content.source` | Origem do conteúdo autorado (`type`: `google`, `onedrive` ou `markup`, mais `url`). |
| `code.owner` / `code.repo` | Repositório GitHub que serve o código (normalmente já corresponde a `{org}`/`{site}`). |
| `access.admin` / `access.preview` / `access.live` | Controle de quem pode acessar admin, preview e live (`allow`, `requireAuth`, `apiKeyId`). |
| `cdn.prod` | Configuração de CDN de produção (`type`: `fastly`, `cloudflare`, `cloudfront`, `akamai` ou `managed`). |
| `sidekick` | Configurações do Sidekick (host de edição, plugins, etc.). |

A lista completa de campos está no schema `SiteConfig` da [documentação oficial](https://www.aem.live/docs/admin.html).

## Usuários do projeto

### Listar usuários

```bash
curl -X GET "https://admin.hlx.page/config/{org}/users.json" \
  -H "authorization: token $API_KEY"
```

### Adicionar ou atualizar um usuário

```bash
curl -X POST "https://admin.hlx.page/config/{org}/users.json" \
  -H "authorization: token $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pessoa@empresa.com",
    "roles": ["admin"]
  }'
```

Resposta esperada:

```json
{
  "id": "string",
  "email": "pessoa@empresa.com",
  "name": "string",
  "roles": ["admin"]
}
```

### Remover um usuário

```bash
curl -X DELETE "https://admin.hlx.page/config/{org}/users/{id}.json" \
  -H "authorization: token $API_KEY"
```

Onde `{id}` é o identificador retornado ao listar ou criar o usuário.

## Erros comuns

| Código | Significado |
| --- | --- |
| `401` | Não autenticado — cookie de sessão ou API key ausente/inválida. |
| `403` | Autenticado, mas sem permissão para a operação. |
| `404` | Recurso não encontrado (`org`, `site` ou usuário inexistente). |
| `409` | Conflito — a operação não é permitida no estado atual do recurso. |
| `429` | Limite de requisições atingido, veja [limites da Admin API](https://www.aem.live/docs/limits#admin-api-limits). |
| `500` / `503` | Erro interno ou timeout na origem do conteúdo (ex.: Google Docs, SharePoint). |
