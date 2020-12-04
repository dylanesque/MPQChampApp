// level generator(s)

function calculateLevelRange(rarity, totalLevel) {
  const twoStarLevels = [15, 22, 30, 38, 46, 47, 54, 62, 70, 78, 79, 86, 144];
  const threeStarLevels = [
    40,
    50,
    63,
    76,
    89,
    91,
    102,
    114,
    127,
    140,
    142,
    153,
    266,
  ];
  const fourStarLevels = [
    70,
    86,
    106,
    127,
    147,
    152,
    168,
    188,
    209,
    229,
    233,
    250,
    370,
  ];
  const fiveStarLevels = [
    270,
    285,
    300,
    315,
    330,
    345,
    360,
    375,
    390,
    405,
    420,
    435,
    550,
  ];

  const range = (start, end) => new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
  // calculates start and end to feed the rang function from the indexes of a) the first value in
  // the appropriate rarity level array, and b) totalLevel - 1
}

// parses an array of feedees/feeders from string value
function parseFeeds(data) {
  if (data === 'none') {
    return;
  } else if (!data.includes(',')) {
    return [parseInt(data)];
  } else {
    return [data.split(',')];
  }
}

export default parseFeeds;
