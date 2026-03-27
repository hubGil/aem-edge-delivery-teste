---
layout: doc
title: Início
---

# Documentação em português

Esta documentação explica como este projeto em Edge Delivery Services foi montado, como instalar e rodar localmente, como configurar a autoria com Adobe Document Authoring, como os blocks funcionam e como o `paths.json` liga conteúdo e código.

## O que existe neste projeto

- Site baseado em AEM Edge Delivery Services.
- Front-end em JavaScript vanilla, CSS e HTML decorado no navegador.
- Blocos reutilizáveis em `blocks/<nome>/<nome>.js` e `blocks/<nome>/<nome>.css`.
- Pipeline principal concentrado em `scripts/scripts.js`.
- Conteúdo publicado via DA/AEM e resolvido por `paths.json`.

## Mapa rápido

```text
Autor cria conteúdo no DA/AEM
        |
        v
Conteúdo é exposto por rotas do projeto
        |
        v
scripts/scripts.js decora a página
        |
        v
Cada block transforma o HTML bruto em UI final
```

## Trilha recomendada

1. Leia [Como instalar](/pt/instalacao).
2. Configure a autoria em [Configuração do Adobe DA](/pt/configuracao-da).
3. Entenda o carregamento em [Arquitetura do projeto](/pt/arquitetura).
4. Veja a base dos componentes em [Visão geral dos blocks](/pt/blocks/visao-geral).
5. Consulte os detalhes de cada block conforme necessário.

## Estrutura principal

```text
blocks/      blocks reutilizáveis
scripts/     pipeline global de decoração e carregamento
styles/      estilos globais
doc/         documentação em VitePress
paths.json   mapeamento entre conteúdo autorável e rotas do projeto
```

## Idiomas

- Português: conteúdo principal e atualizado.
- Inglês: estrutura pronta em `/en/`, ainda em construção.
