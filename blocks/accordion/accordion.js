function isHeaderRow(titleCell, contentCell) {
  const title = titleCell.textContent.trim().toLowerCase();
  const content = contentCell.textContent.trim().toLowerCase();

  return title === 'titulo' && content === 'conteudo';
}

function setItemExpanded(item, expanded) {
  const button = item.querySelector('.accordion-button');
  const panel = item.querySelector('.accordion-panel');

  item.classList.toggle('is-open', expanded);
  button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  panel.hidden = !expanded;
}

export default function decorate(block) {
  const rows = [...block.children];
  const items = rows
    .map((row) => [...row.children])
    .filter((cells) => cells.length >= 2)
    .filter(([titleCell, contentCell]) => !isHeaderRow(titleCell, contentCell));

  if (!items.length) return;

  const list = document.createElement('div');
  list.className = 'accordion-list';

  items.forEach((cells, index) => {
    const [titleCell, contentCell] = cells;
    const item = document.createElement('section');
    item.className = 'accordion-item';

    const heading = document.createElement('h3');
    heading.className = 'accordion-heading';

    const button = document.createElement('button');
    button.className = 'accordion-button';
    button.type = 'button';
    button.id = `accordion-button-${index}`;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `accordion-panel-${index}`);

    const label = document.createElement('span');
    label.className = 'accordion-label';
    label.innerHTML = titleCell.innerHTML;

    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');

    button.append(label, icon);
    heading.append(button);

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.id = `accordion-panel-${index}`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', button.id);
    panel.hidden = true;
    while (contentCell.firstChild) {
      panel.append(contentCell.firstChild);
    }

    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';

      if (block.classList.contains('single')) {
        list.querySelectorAll('.accordion-item').forEach((accordionItem) => {
          setItemExpanded(accordionItem, false);
        });
      }

      setItemExpanded(item, willOpen);
    });

    item.append(heading, panel);
    list.append(item);
  });

  if (block.classList.contains('first-open')) {
    setItemExpanded(list.querySelector('.accordion-item'), true);
  }

  block.replaceChildren(list);
}
