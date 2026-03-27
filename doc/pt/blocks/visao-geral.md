---
layout: doc
title: Visão geral dos blocks
---

# Visão geral dos blocks

## Estrutura padrão

Cada block vive em:

```text
blocks/<nome>/<nome>.js
blocks/<nome>/<nome>.css
```

## Contrato entre autor e código

O block não recebe props tipadas. Ele recebe HTML autorado e transforma isso em interface.

Em termos práticos:

```text
Autor define estrutura
  |
  v
O navegador recebe o HTML
  |
  v
decorate(block) lê células, links, imagens e textos
  |
  v
O DOM final do componente é montado
```

## Padrão mais comum no projeto

Muitos blocks deste projeto seguem um destes formatos:

- tabela inline, quando a informação está escrita diretamente na página;
- tabela de configuração, quando o block faz `fetch` de uma origem externa;
- conteúdo simples já autorado, com pequenos ajustes de classe e acessibilidade.

## Esqueleto típico de um block

```js
export default async function decorate(block) {
  // 1. Ler o HTML de entrada
  // 2. Extrair configuração ou conteúdo
  // 3. Criar a nova estrutura DOM
  // 4. Aplicar listeners e atributos
}
```

## O que observar ao criar ou manter um block

- Qual é a estrutura de autoria esperada.
- Quais linhas ou colunas são tratadas como cabeçalho.
- Se o block aceita modo inline e modo configurado.
- Se o JS cria elementos novos ou apenas adiciona classes.
- Como o CSS está escopado em `.nome-do-block`.

## Blocks atuais do projeto

| Block | Papel |
| --- | --- |
| `accordion` | FAQ ou conteúdo expansível |
| `bracket` | chaveamento de partidas |
| `cards` | lista de cards com imagem e texto |
| `carousel` | slider com mídia e CTA |
| `columns` | variação visual por número de colunas |
| `fragment` | inclusão de conteúdo de outra página |
| `header` | navegação do site |
| `footer` | rodapé do site |
| `hero` | placeholder para auto-block |
| `title` | placeholder para bloco de título |
| `standings` | classificação e partidas |
| `video` | embed de vídeo, hoje focado em YouTube |

## Leitura recomendada

1. Entenda o formato autorado.
2. Leia o `decorate()`.
3. Veja o CSS associado.
4. Teste com HTML real no ambiente local.
5. Consulte a [Matriz dos blocks](/pt/blocks/matriz) para comparar padrões.
