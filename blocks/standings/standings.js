const STATUS_VARIANTS = {
  classificado: {
    label: 'Classificado',
    className: 'status-qualified',
  },
  playoff: {
    label: 'Playoff',
    className: 'status-playoff',
  },
  repescagem: {
    label: 'Repescagem',
    className: 'status-play-in',
  },
  rebaixamento: {
    label: 'Rebaixamento',
    className: 'status-relegation',
  },
};

const CONFIG_KEYS = new Set([
  'source',
  'matches',
  'split',
  'phase',
  'limit',
  'title',
  'matches-title',
]);

function normalizeValue(value) {
  return (value || '').toString().trim();
}

function normalizeStatus(value) {
  return normalizeValue(value).toLowerCase();
}

function getRowCells(row) {
  return [...row.children].map((cell) => ({
    text: normalizeValue(cell.textContent),
    html: cell.innerHTML,
  }));
}

function parseConfig(rows) {
  const config = {};

  rows.forEach((cells) => {
    if (cells.length < 2) return;
    const key = normalizeStatus(cells[0].text);
    if (!CONFIG_KEYS.has(key)) return;
    config[key] = cells[1].text || normalizeValue(cells[1].html);
  });

  return config;
}

function isConfigBlock(rows) {
  return rows.every((cells) => {
    if (cells.length < 2) return false;
    return CONFIG_KEYS.has(normalizeStatus(cells[0].text));
  });
}

async function fetchSheet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  const json = await response.json();
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.data)) return json.data;
  if (json['shared-default'] && Array.isArray(json['shared-default'].data)) {
    return json['shared-default'].data;
  }
  return [];
}

function normalizeEntry(entry) {
  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => [normalizeStatus(key), value]),
  );
}

function sortStandings(data) {
  return [...data].sort((left, right) => {
    const leftPosition = Number(left.position || 999);
    const rightPosition = Number(right.position || 999);
    if (leftPosition !== rightPosition) return leftPosition - rightPosition;

    const pointDiff = Number(right.points || 0) - Number(left.points || 0);
    if (pointDiff !== 0) return pointDiff;

    const gameDiff = Number(right.game_diff || 0) - Number(left.game_diff || 0);
    if (gameDiff !== 0) return gameDiff;

    return normalizeValue(left.team).localeCompare(normalizeValue(right.team), 'pt-BR');
  });
}

function buildLegend(statusesInUse) {
  if (!statusesInUse.length) return null;

  const legend = document.createElement('ul');
  legend.className = 'standings-legend';

  statusesInUse.forEach((statusKey) => {
    const item = document.createElement('li');
    item.className = 'standings-legend-item';

    const marker = document.createElement('span');
    marker.className = `standings-legend-marker ${STATUS_VARIANTS[statusKey].className}`;
    marker.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = STATUS_VARIANTS[statusKey].label;

    item.append(marker, label);
    legend.append(item);
  });

  return legend;
}

function buildInlineTable(rows) {
  const headerRow = rows[0];
  const bodyRows = rows.slice(1);
  const statusesInUse = [];
  const table = document.createElement('table');
  table.className = 'standings-table';

  const thead = document.createElement('thead');
  const headTr = document.createElement('tr');

  headerRow.forEach((cell, index) => {
    if (index === 0 && normalizeStatus(cell.text) === 'status') return;

    const th = document.createElement('th');
    th.scope = 'col';
    th.innerHTML = cell.html;
    headTr.append(th);
  });

  thead.append(headTr);

  const tbody = document.createElement('tbody');
  bodyRows.forEach((row) => {
    const tr = document.createElement('tr');
    const [statusCell, ...dataCells] = row;
    const statusKey = normalizeStatus(statusCell.text);
    const statusVariant = STATUS_VARIANTS[statusKey];

    if (statusVariant) {
      tr.classList.add(statusVariant.className);
      if (!statusesInUse.includes(statusKey)) statusesInUse.push(statusKey);
    } else {
      dataCells.unshift(statusCell);
    }

    dataCells.forEach((cell, index) => {
      const node = document.createElement(index === 0 ? 'th' : 'td');
      if (index === 0) node.scope = 'row';
      node.innerHTML = cell.html;
      tr.append(node);
    });

    tbody.append(tr);
  });

  table.append(thead, tbody);
  return { table, legend: buildLegend(statusesInUse) };
}

function buildDataTable(standings) {
  const statusesInUse = [];
  const table = document.createElement('table');
  table.className = 'standings-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Pos</th>
        <th scope="col">Time</th>
        <th scope="col">Pts</th>
        <th scope="col">MJ</th>
        <th scope="col">V</th>
        <th scope="col">D</th>
        <th scope="col">GW</th>
        <th scope="col">GL</th>
        <th scope="col">SG</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement('tbody');

  sortStandings(standings).forEach((entry, index) => {
    const tr = document.createElement('tr');
    const statusKey = normalizeStatus(entry.status);
    const statusVariant = STATUS_VARIANTS[statusKey];
    if (statusVariant) {
      tr.classList.add(statusVariant.className);
      if (!statusesInUse.includes(statusKey)) statusesInUse.push(statusKey);
    }

    const position = normalizeValue(entry.position) || `${index + 1}`;
    const cells = [
      position,
      normalizeValue(entry.team),
      normalizeValue(entry.points) || '0',
      normalizeValue(entry.matches_played) || '0',
      normalizeValue(entry.match_wins) || '0',
      normalizeValue(entry.match_losses) || '0',
      normalizeValue(entry.game_wins) || '0',
      normalizeValue(entry.game_losses) || '0',
      normalizeValue(entry.game_diff) || '0',
    ];

    cells.forEach((cellValue, cellIndex) => {
      const node = document.createElement(cellIndex === 1 ? 'th' : 'td');
      if (cellIndex === 1) node.scope = 'row';
      node.textContent = cellValue;
      tr.append(node);
    });

    tbody.append(tr);
  });

  table.append(tbody);
  return { table, legend: buildLegend(statusesInUse) };
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function buildMatchesSection(matches, titleText) {
  const section = document.createElement('section');
  section.className = 'standings-matches';

  const title = document.createElement('h3');
  title.className = 'standings-subtitle';
  title.textContent = titleText;
  section.append(title);

  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'standings-empty';
    empty.textContent = 'Nenhuma partida cadastrada.';
    section.append(empty);
    return section;
  }

  const list = document.createElement('ul');
  list.className = 'standings-match-list';

  matches.forEach((match) => {
    const item = document.createElement('li');
    item.className = 'standings-match-item';

    const meta = document.createElement('p');
    meta.className = 'standings-match-meta';
    meta.textContent = [
      normalizeValue(match.phase),
      normalizeValue(match.round),
      formatDate(normalizeValue(match.date)),
      `BO${normalizeValue(match.best_of) || '-'}`,
    ].filter(Boolean).join(' • ');

    const teams = document.createElement('p');
    teams.className = 'standings-match-teams';
    teams.textContent = `${normalizeValue(match.team_a)} x ${normalizeValue(match.team_b)}`;

    const result = document.createElement('p');
    result.className = 'standings-match-result';

    if (normalizeValue(match.status) === 'finished') {
      result.textContent = `${normalizeValue(match.score_a)} - ${normalizeValue(match.score_b)} ${normalizeValue(match.winner) ? `• ${normalizeValue(match.winner)}` : ''}`;
    } else {
      result.textContent = normalizeValue(match.status) || 'scheduled';
    }

    item.append(meta, teams, result);
    list.append(item);
  });

  section.append(list);
  return section;
}

function buildHeader(titleText) {
  if (!titleText) return null;

  const title = document.createElement('h2');
  title.className = 'standings-title';
  title.textContent = titleText;
  return title;
}

function renderTableContent(block, table, legend, titleText) {
  const fragment = document.createDocumentFragment();
  const title = buildHeader(titleText);
  if (title) fragment.append(title);

  const wrapper = document.createElement('div');
  wrapper.className = 'standings-wrapper';
  wrapper.append(table);
  fragment.append(wrapper);

  if (legend) fragment.append(legend);
  block.replaceChildren(fragment);
}

export default async function decorate(block) {
  const rows = [...block.children].map(getRowCells).filter((cells) => cells.length >= 2);
  if (!rows.length) return;

  if (!isConfigBlock(rows)) {
    const { table, legend } = buildInlineTable(rows);
    renderTableContent(block, table, legend);
    return;
  }

  const config = parseConfig(rows);
  const standings = config.source ? await fetchSheet(config.source) : [];
  const matches = config.matches ? await fetchSheet(config.matches) : [];

  const filteredStandings = standings.map(normalizeEntry).filter((entry) => {
    const splitMatches = !config.split || normalizeValue(entry.split) === config.split;
    const phaseMatches = !config.phase || normalizeValue(entry.phase) === config.phase;
    return splitMatches && phaseMatches;
  });

  const filteredMatches = matches
    .map(normalizeEntry)
    .filter((entry) => {
      const splitMatches = !config.split || normalizeValue(entry.split) === config.split;
      const phaseMatches = !config.phase || normalizeValue(entry.phase) === config.phase;
      return splitMatches && phaseMatches;
    })
    .slice(0, Number(config.limit || 5));

  const { table, legend } = buildDataTable(filteredStandings);
  const fragment = document.createDocumentFragment();
  const title = buildHeader(config.title || 'Classificacao');
  if (title) fragment.append(title);

  const wrapper = document.createElement('div');
  wrapper.className = 'standings-wrapper';
  wrapper.append(table);
  fragment.append(wrapper);

  if (legend) fragment.append(legend);

  if (config.matches) {
    fragment.append(buildMatchesSection(filteredMatches, config['matches-title'] || 'Partidas'));
  }

  block.replaceChildren(fragment);
}
