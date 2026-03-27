---
layout: doc
title: Header e Footer
---

# Header e Footer

## Objetivo

Montar a navegação e o rodapé a partir de fragments de conteúdo.

## Header

O `header`:

- lê a metadata `nav`;
- usa `/nav` como fallback;
- carrega o fragmento;
- organiza as áreas `brand`, `sections` e `tools`;
- cria o menu hambúrguer;
- trata dropdown em desktop;
- trata expansão e colapso em mobile;
- cuida de acessibilidade com `aria-expanded`, foco e tecla `Escape`.

## Footer

O `footer`:

- lê a metadata `footer`;
- usa `/footer` como fallback;
- carrega o fragmento;
- move o conteúdo para dentro do block.

## Ilustração simples

```text
metadata nav/footer
  |
  v
loadFragment()
  |
  v
header/footer final decorado
```

## Observações

- `header` é um block estrutural, não apenas visual.
- Grande parte do comportamento responsivo vive no JS dele.
