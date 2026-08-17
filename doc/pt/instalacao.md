---
layout: doc
title: Como instalar
---

# Como instalar

## Pré-requisitos

- Node.js instalado.
- `npm` disponível no terminal.
- **Fork deste repositório** feito na sua conta — [faça o fork aqui](https://github.com/hubGil/aem-edge-delivery-teste/fork).
- Fork clonado localmente.

## Instalar o AEM Code Sync GitHub App

> _Nota: os passos abaixo já cobrem o necessário. Consulte o [Developer Tutorial](https://www.aem.live/developer/tutorial) para ver a documentação oficial completa se necessário._

1. Acesse o [AEM Code Sync](https://github.com/apps/aem-code-sync/installations/new) e instale a aplicação no repositório do projeto.
2. Em "Repository access", escolha **Only select repositories**, selecione seu repositório e clique em **Save**.
3. Defina os **usuários**, as **permissões** e a **content source** e clique em **Finish setup**.

   > _As configurações e permissões podem ser alteradas posteriormente pelo [AEM Configuration Manager](https://tools.aem.live/) ou pela [Admin API](https://www.aem.live/docs/admin.html)._

O site fica disponível em `https://<branch>--<repo>--<owner>.aem.page/` (ex.: `https://main--mysite--aemtutorial.aem.page/`).

### Publique para ver o site rodando

O "Finish setup" só entrega a URL de preview vazia. É preciso publicar conteúdo (Sidekick ou fluxo de autoria) para ver algo, tanto no preview (`aem.page`) quanto no live (`aem.live`).

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
