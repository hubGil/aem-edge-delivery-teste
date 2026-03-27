const CONFIG_KEYS = new Set([
  'source',
  'sheet',
  'split',
  'phase',
  'title',
]);

const CARD_HEIGHT = 66;
const ROUND_TITLE_HEIGHT = 28;
const BASE_MATCH_GAP = 26;

function normalizeValue(value) {
  return (value || '').toString().trim();
}

function normalizeKey(value) {
  return normalizeValue(value).toLowerCase();
}

function getCellText(cell) {
  return normalizeValue(cell?.textContent);
}

function getRowCells(row) {
  return [...row.children].map((cell) => ({
    text: getCellText(cell),
    html: cell.innerHTML,
  }));
}

function isHeaderRow(cells) {
  return normalizeKey(cells[0]?.text) === 'round';
}

function isConfigBlock(rows) {
  return rows.every((cells) => cells.length >= 2 && CONFIG_KEYS.has(normalizeKey(cells[0].text)));
}

function parseConfig(rows) {
  const config = {};

  rows.forEach((cells) => {
    if (cells.length < 2) return;
    config[normalizeKey(cells[0].text)] = cells[1].text || normalizeValue(cells[1].html);
  });

  return config;
}

async function fetchSheet(url, sheetName) {
  const targetUrl = sheetName ? `${url}${url.includes('?') ? '&' : '?'}sheet=${sheetName}` : url;
  const response = await fetch(targetUrl);
  if (!response.ok) throw new Error(`Failed to fetch ${targetUrl}`);

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
    Object.entries(entry).map(([key, value]) => [normalizeKey(key), value]),
  );
}

function getMatchDataFromCells(cells) {
  if (cells.length < 6 || isHeaderRow(cells)) return null;

  return {
    round: cells[0].text,
    match: cells[1].text,
    teamA: cells[2].text,
    scoreA: cells[3].text,
    teamB: cells[4].text,
    scoreB: cells[5].text,
    winner: cells[6]?.text || '',
  };
}

function getMatchDataFromEntry(entry) {
  return {
    round: normalizeValue(entry.round),
    match: normalizeValue(entry.match || entry.match_id),
    teamA: normalizeValue(entry.team_a),
    scoreA: normalizeValue(entry.score_a),
    teamB: normalizeValue(entry.team_b),
    scoreB: normalizeValue(entry.score_b),
    winner: normalizeValue(entry.winner),
  };
}

function createTeamRow(name, score, winner, isTop) {
  const row = document.createElement('div');
  row.className = 'bracket-team';

  if (winner && normalizeKey(winner) === normalizeKey(name)) {
    row.classList.add('is-winner');
  }

  if (!isTop) row.classList.add('is-bottom');

  const nameNode = document.createElement('span');
  nameNode.className = 'bracket-team-name';
  nameNode.textContent = name;

  const scoreNode = document.createElement('span');
  scoreNode.className = 'bracket-team-score';
  scoreNode.textContent = score || '0';

  row.append(nameNode, scoreNode);
  return row;
}

function createMatchCard(match, options) {
  const {
    isFinalRound,
    hasLeftConnector,
    hasRightConnector,
    isPairTop,
    isPairBottom,
    connectorStem,
    topOffset,
  } = options;

  const card = document.createElement('article');
  card.className = 'bracket-match';
  card.style.setProperty('--match-top', `${topOffset}px`);
  card.style.setProperty('--connector-stem', `${connectorStem}px`);

  if (hasLeftConnector) card.classList.add('has-left-connector');
  if (hasRightConnector) card.classList.add('has-right-connector');
  if (isPairTop) card.classList.add('is-pair-top');
  if (isPairBottom) card.classList.add('is-pair-bottom');

  if (isFinalRound && match.match) {
    const label = document.createElement('p');
    label.className = 'bracket-match-label';
    label.textContent = match.match;
    card.append(label);
  }

  const panel = document.createElement('div');
  panel.className = 'bracket-panel';
  const surface = document.createElement('div');
  surface.className = 'bracket-panel-surface';
  surface.append(
    createTeamRow(match.teamA, match.scoreA, match.winner, true),
    createTeamRow(match.teamB, match.scoreB, match.winner, false),
  );
  panel.append(surface);

  card.append(panel);
  return card;
}

function buildRoundColumn(roundName, roundEntries, roundIndex, totalRounds, unit, totalHeight) {
  const column = document.createElement('section');
  column.className = 'bracket-round';
  column.style.setProperty('--round-height', `${totalHeight}px`);

  const title = document.createElement('h3');
  title.className = 'bracket-round-title';
  title.textContent = roundName;
  column.append(title);

  const roundMultiplier = 2 ** roundIndex;
  const roundTopOffset = ROUND_TITLE_HEIGHT + (((roundMultiplier - 1) / 2) * unit);
  const hasLeftConnector = roundIndex > 0;
  const hasRightConnector = roundIndex < totalRounds - 1;
  const isFinalRound = roundIndex === totalRounds - 1;

  roundEntries.forEach((match, matchIndex) => {
    const topOffset = roundTopOffset + (matchIndex * roundMultiplier * unit);
    const connectorStem = (roundMultiplier * unit) / 2;
    const isPairTop = matchIndex % 2 === 0;
    const isPairBottom = !isPairTop;

    column.append(createMatchCard(match, {
      isFinalRound,
      hasLeftConnector,
      hasRightConnector,
      isPairTop,
      isPairBottom,
      connectorStem,
      topOffset,
    }));
  });

  return column;
}

function renderBracket(block, matches, titleText) {
  if (!matches.length) return;

  const rounds = [...new Set(matches.map((match) => match.round))];
  const firstRoundMatches = matches.filter((match) => match.round === rounds[0]).length;
  const unit = CARD_HEIGHT + BASE_MATCH_GAP;
  const totalHeight = ROUND_TITLE_HEIGHT
    + (firstRoundMatches * CARD_HEIGHT)
    + ((firstRoundMatches - 1) * BASE_MATCH_GAP);

  const fragment = document.createDocumentFragment();

  if (titleText) {
    const title = document.createElement('h2');
    title.className = 'bracket-title';
    title.textContent = titleText;
    fragment.append(title);
  }

  const layout = document.createElement('div');
  layout.className = 'bracket-layout';

  rounds.forEach((roundName, roundIndex) => {
    const roundEntries = matches.filter((match) => match.round === roundName);
    layout.append(buildRoundColumn(
      roundName,
      roundEntries,
      roundIndex,
      rounds.length,
      unit,
      totalHeight,
    ));
  });

  fragment.append(layout);
  block.replaceChildren(fragment);
}

export default async function decorate(block) {
  const rows = [...block.children].map(getRowCells).filter((cells) => cells.length >= 2);
  if (!rows.length) return;

  if (!isConfigBlock(rows)) {
    const matches = rows.map(getMatchDataFromCells).filter(Boolean);
    renderBracket(block, matches);
    return;
  }

  const config = parseConfig(rows);
  const entries = config.source
    ? await fetchSheet(config.source, config.sheet)
    : [];

  const matches = entries
    .map(normalizeEntry)
    .filter((entry) => {
      const splitMatches = !config.split
        || !normalizeValue(entry.split)
        || normalizeValue(entry.split) === config.split;
      const phaseMatches = !config.phase
        || !normalizeValue(entry.phase)
        || normalizeValue(entry.phase) === config.phase;
      return splitMatches && phaseMatches;
    })
    .map(getMatchDataFromEntry)
    .filter((match) => match.round && match.teamA && match.teamB);

  renderBracket(block, matches, config.title);
}
