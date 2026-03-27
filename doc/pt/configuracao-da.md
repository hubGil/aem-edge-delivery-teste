---
layout: doc
title: Configuração do Adobe DA
---

# Configuração do Adobe DA

Nesta documentação, "DA" se refere ao fluxo de autoria do conteúdo que depois será servido pelo projeto Edge Delivery.

## Visão do fluxo

```text
Autor cria ou edita conteúdo
  |
  v
Conteúdo fica disponível no espaço do projeto
  |
  v
paths.json define quais caminhos entram no site
  |
  v
O front-end lê esse HTML e aplica os blocks
```

## O que precisa estar configurado

- O repositório deve estar conectado ao `aem-code-sync`.
- O conteúdo deve existir abaixo do prefixo usado neste projeto:

```text
/content/aem-edge-delivery-teste/
```

- Os paths publicados precisam respeitar o que foi definido em `paths.json`.

## Estrutura de conteúdo esperada

Este projeto foi configurado para incluir:

```json
{
  "includes": [
    "/content/aem-edge-delivery-teste/**"
  ]
}
```

Na prática, isso significa que o conteúdo autorado para o site deve viver dentro desse tronco.

## Como pensar a autoria

O autor normalmente trabalha com:

- Texto, títulos, links e imagens.
- Tabelas que representam a entrada de blocks.
- Páginas auxiliares como `nav`, `footer` e fragments.

## Convenção importante para blocks

Em Edge Delivery, o autor não cria um componente React ou um JSON de props. Ele cria estrutura HTML ou tabela, e o block interpreta essa estrutura.

Exemplo conceitual:

```text
Autor escreve uma tabela
  |
  v
O HTML chega ao navegador
  |
  v
blocks/algum-block/algum-block.js transforma isso em UI final
```

## Exemplo de páginas auxiliares

Alguns blocks dependem de conteúdo separado:

- `header` carrega um fragmento de navegação.
- `footer` carrega um fragmento de rodapé.
- `fragment` carrega outra página `.plain.html` e reaplica decoração.

## Checklist de configuração

1. Conectar o repositório ao GitHub App `aem-code-sync`.
2. Garantir que o conteúdo esteja em `/content/aem-edge-delivery-teste/`.
3. Publicar ou disponibilizar o conteúdo no ambiente de preview.
4. Validar em `localhost:3000`.
5. Confirmar se a estrutura autorada corresponde ao block esperado.

## Boas práticas para autoria

- Mantenha os nomes dos campos consistentes quando o block lê configuração por tabela.
- Evite mudar o contrato do block sem atualizar a documentação.
- Teste tanto o HTML bruto quanto o resultado decorado.
- Para blocos orientados a dados, valide o JSON de origem antes de depurar CSS ou JS.
