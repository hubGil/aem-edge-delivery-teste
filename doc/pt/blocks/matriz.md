---
layout: doc
title: Matriz dos blocks
---

# Matriz dos blocks

Esta página resume como cada block é autorado, de onde vêm os dados e qual é o papel do JavaScript na transformação do HTML.

## Matriz

| Block | Formato de autoria | Fonte de dados | Papel do JS |
| --- | --- | --- | --- |
| `accordion` | tabela com título e conteúdo | inline | cria estrutura acessível expansível |
| `bracket` | tabela inline ou tabela de configuração | inline ou JSON remoto | organiza rodadas, partidas e conectores |
| `cards` | linhas com imagem e conteúdo | inline | converte em lista de cards e otimiza imagens |
| `carousel` | tabela com 5 colunas | inline | monta slider, navegação, dots e autoplay |
| `columns` | conteúdo já estruturado em colunas | inline | adiciona classes de layout e imagem |
| `fragment` | link ou caminho de página | `.plain.html` de outra rota | busca, redecorra e injeta conteúdo |
| `header` | fragmento de navegação | metadata `nav` + fragment | monta menu, dropdown e mobile nav |
| `footer` | fragmento de rodapé | metadata `footer` + fragment | injeta conteúdo de rodapé |
| `hero` | auto-block a partir de `picture` + `h1` | inline | hoje atua como ponto estrutural |
| `title` | reservado para evolução | inline | hoje sem lógica relevante |
| `standings` | tabela inline ou tabela de configuração | inline ou JSON remoto | monta tabela, legenda e lista de partidas |
| `video` | link ou ID do vídeo | inline | converte URL em embed |

## Leitura rápida

```text
inline table     -> JS interpreta células -> block final
config table     -> JS faz fetch          -> block final
fragment path    -> JS busca HTML         -> block final
metadata nav     -> JS busca fragment     -> header/footer final
```

## Quando usar a matriz

Use esta página quando precisar decidir:

- se um block deve ser autorado manualmente ou por dados;
- se um endpoint JSON precisa ser exposto;
- se um novo block deve seguir o padrão inline, configurado ou fragmentado.
