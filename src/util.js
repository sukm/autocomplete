const weight = {
  fullName: Number.MAX_SAFE_INTEGER,
  firstName: 2,
  firstMiddleName: 4,
};

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, '');
}

function normalizeName(fullName) {
  const nameArr = fullName.toLowerCase().split(' ');
  let middle = '';
  if (nameArr.length > 2) {
    middle = nameArr[1];
  }
  const first = nameArr[0];
  const last = nameArr[-1];
  return [first, middle, last];
}

function weightName(fullName, prefix) {
  const [first, middle, last] = normalizeName(fullName);
  if (first == prefix) {
    return weight['firstName'];
  }
  if (middle && first + middle == prefix) {
    return weight['firstMiddleName'];
  }
  if (first + middle + last == prefix) {
    return weight['fullName'];
  }
  return 0;
}

function sortSuggestions(suggestions) {
  const weighted_suggestions = [];
  suggestions
    .sort((a, b) => a[0] - b[0])
    .forEach((suggestion) => {
      weighted_suggestions.push([suggestion[1], suggestion[2]]);
    });

  return weighted_suggestions;
}

export { weightName, normalizeText, sortSuggestions };
