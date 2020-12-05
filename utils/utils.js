// level generator(s)

function calculateLevelRange(rarity, totalLevel) {
  // helper function to generate ranged array of possible character levels
  const range = (start, end) =>
    new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
  
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

  if (rarity === 2) {
    return range(twoStarLevels[0], twoStarLevels[totalLevel - 1]);
  } else if (rarity === 3) {
    return range(threeStarLevels[0], threeStarLevels[totalLevel - 1]);
  } else if (rarity === 4) {
    return range(fourStarLevels[0], fourStarLevels[totalLevel - 1]);
  } else {
    return range(fiveStarLevels[0], fiveStarLevels[totalLevel - 1]);
  }
}

// Level changing lifecycle:
// 1) User changes value of power level (They will be blocked from raising the third value if the total power level is 13)
// 2) This change fires the level changing function, feeding it the character's rarity and totalPowerLevel

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
