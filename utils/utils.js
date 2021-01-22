// generates levels for level select menus
export function calculateLevels(rarity) {
  const range = (start, end) =>
    new Array(end - start + 1).fill(undefined).map((_, i) => i + start);

  switch (rarity) {
    case 2:
      return range(15, 144);
      break;
    case 3:
      return range(40, 266);
      break;
    case 4:
      return range(70, 370);
      break;
    case 5:
      return range(270, 550);
      break;

    default:
      break;
  }
}

function calculateDynamicLevelRange(rarity, totalLevel) {
  // helper function to generate ranged array of possible character levels

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
export function parseFeeds(data) {
  if (data === 'none') {
    return;
  } else if (!data.includes(',')) {
    return [data, data];
  } else {
    return data.split(',');
  }
}

// Calculates next major reward for two star characters
export function getTwoStatus(level, feedee) {
  if (level === 144) {
    return 'Champion Maxed';
  } else if (level < 144 && level >= 139) {
    return `${144 - level} levels to: Mighty Recruit Token`;
  } else if (level < 139 && level >= 127) {
    return `${139 - level} levels to: ${feedee} shards`;
  } else if (level < 127 && level >= 119) {
    return `${127 - level} levels to: ${feedee} shards`;
  } else if (level < 119 && level >= 115) {
    return `${119 - level} levels to: ${feedee} shards`;
  } else if (level < 115 && level >= 107) {
    return `${115 - level} levels to: ${feedee} shards`;
  } else if (level < 107 && level >= 99) {
    return `${107 - level} levels to: ${feedee} shards`;
  } else {
    return `${99 - level} levels to ${feedee} cover`;
  }
}

// Calculates next major reward for three star character

export function getThreeStatus(level, feedee) {
  const feedees = parseFeeds(feedee);
  if (level === 266) {
    return 'Champion Maxed';
  } else if (level === 265 || level === 256) {
    return '1 level to: Latest Legends token';
  } else if (level < 265 && level >= 261) {
    return `${265 - level} level(s) to: 200 ${feedees[0]} shards`;
  } else if (level === 260) {
    return '1 level to: 15 Command Points';
  } else if (level === 259 || level === 219) {
    return `1 level to: 100 ${feedees[1]} shards`;
  } else if (level < 258 && level >= 255) {
    return `${258 - level} level(s) to: 100 ${feedees[0]} shards`;
  } else if (level < 255 && level >= 250) {
    return `${255 - level} level(s) to: 100 ${feedees[0]} shards`;
  } else if (level < 250 && level >= 247) {
    return `${250 - level} level(s) to: 95 ${feedees[1]} shards`;
  } else if (level < 247 && level >= 243) {
    return `${247 - level} level(s) to: 8 Command Points`;
  } else if (level < 243 && level >= 240) {
    return `${243 - level} level(s) to: Mighty Recruit Token`;
  } else if (level === 239) {
    return `1 level to: 85 ${feedees[1]} shards`;
  } else if (level < 239 && level >= 235) {
    return `${239 - level} level(s) to: Latest Legends Token`;
  } else if (level < 235 && level >= 230) {
    return `${239 - level} level(s) to: 5 Command Points`;
  } else if (level < 230 && level >= 227) {
    return `${230 - level} level(s) to: 75 ${feedees[1]} shards`;
  } else if (level < 227 && level >= 223) {
    return `${227 - level} level(s) to: Latest Legends Token`;
  } else if (level < 223 && level >= 220) {
    return `${223 - level} level(s) to: 200 ${feedees[0]} shards`;
  } else if (level < 219 && level >= 215) {
    return `${219 - level} level(s) to: 100 ${feedees[0]} shards`;
  } else if (level < 215 && level >= 210) {
    return `${215 - level} level(s) to: 100 ${feedees[0]} shards`;
  } else if (level < 210 && level >= 207) {
    return `${210 - level} level(s) to: 55 ${feedees[1]} shards`;
  } else if (level < 207 && level >= 200) {
    return `${207 - level} level(s) to: Mighty Recruit Token`;
  } else if (level < 200 && level >= 190) {
    return `${200 - level} level(s) to: 45 ${feedees[1]} shards`;
  } else if (level < 190 && level >= 183) {
    return `${190 - level} level(s) to: 35 ${feedees[1]} shards`;
  } else if (level < 183 && level >= 180) {
    return `${183 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 180 && level >= 170) {
    return `${180 - level} level(s) to: 25 ${feedees[1]} shards`;
  } else if (level < 170 && level >= 167) {
    return `${170 - level} level(s) to: 15 ${feedees[1]} shards`;
  } else {
    return `${167 - level} level(s) to: Latest Legends Token`;
  }
}

export function getFourStatus(level, feedee) {
  const noFeedee = feedee === 'none';
  if (level < 271) {
    return `${271 - level} level(s) to: Latest Legends Token`;
  } else if (level < 280 && level >= 271) {
    return (
      `${280 - level} level(s) to: ` +
      (noFeedee ? 'Latest Legends Token' : `${feedee} cover`)
    );
  } else if (level < 290 && level >= 280) {
    return `${290 - level} level(s) to: Latest Legends Token`;
  } else if (level < 295 && level >= 290) {
    return (
      `${295 - level} level(s) to: ` +
      (noFeedee ? '100 Hero points' : `100 ${feedee} shards`)
    );
  } else if (level < 298 && level >= 295) {
    return (
      `${298 - level} level(s) to: ` +
      (noFeedee ? '4 Command Points' : `150 ${feedee} shards`)
    );
  } else if (level < 300 && level >= 298) {
    return `${300 - level} level(s) to: 250 ${feedee} shards`;
  } else if (level < 310 && level >= 300) {
    return (
      `${310 - level} level(s) to: ` +
      (noFeedee ? 'Latest Legends Token' : `${feedee} cover`)
    );
  } else if (level < 315 && level >= 310) {
    return (
      `${315 - level} level(s) to: ` +
      (noFeedee ? '100 Hero points' : `100 ${feedee} shards`)
    );
  } else if (level < 318 && level >= 315) {
    return (
      `${318 - level} level(s) to: ` +
      (noFeedee ? '5 Command Points' : `150 ${feedee} shards`)
    );
  } else if (level < 320 && level >= 318) {
    return `${320 - level} level(s) to: 250 ${feedee} shards`;
  } else if (level < 330 && level >= 320) {
    return `${330 - level} level(s) to: Latest Legends Token`;
  } else if (level < 335 && level >= 330) {
    return (
      `${335 - level} level(s) to: ` +
      (noFeedee ? '100 Hero points' : `100 ${feedee} shards`)
    );
  } else if (level < 338 && level >= 335) {
    return (
      `${338 - level} level(s) to: ` +
      (noFeedee ? '7 Command Points' : `150 ${feedee} shards`)
    );
  } else if (level < 340 && level >= 338) {
    return (
      `${340 - level} level(s) to: ` +
      (noFeedee ? 'Latest Legends Token' : `250 ${feedee} shards`)
    );
  } else if (level < 344 && level >= 338) {
    return (
      `${344 - level} level(s) to: ` +
      (noFeedee ? '7 Command Points' : `100 ${feedee} shards`)
    );
  } else if (level < 347 && level >= 344) {
    return (
      `${347 - level} level(s) to: ` +
      (noFeedee ? '100 Hero points' : `150 ${feedee} shards`)
    );
  } else if (level < 350 && level >= 347) {
    return (
      `${350 - level} level(s) to: ` +
      (noFeedee ? 'Latest Legends Token' : `250 ${feedee} shards`)
    );
  } else if (level < 355 && level >= 350) {
    return (
      `${355 - level} level(s) to: ` +
      (noFeedee ? '250 Hero points' : `100 ${feedee} shards`)
    );
  } else if (level < 358 && level >= 355) {
    return (
      `${358 - level} level(s) to: ` +
      (noFeedee ? '8 Command Points' : `150 ${feedee} shards`)
    );
  } else if (level < 360 && level >= 358) {
    return (
      `${360 - level} level(s) to: ` +
      (noFeedee ? 'Latest Legends Token' : `250 ${feedee} shards`)
    );
  } else if (level < 362 && level >= 360) {
    return `${362 - level} level(s) to: 10 Command Points`;
  } else if (level < 364 && level >= 362) {
    return `${364 - level} level(s) to: 10 Command Points`;
  } else if (level < 366 && level >= 364) {
    return `${366 - level} level(s) to: 25 Command Points`;
  } else if (level < 368 && level >= 366) {
    return `${368 - level} level(s) to: 25 Command Points`;
  } else {
    return `${370 - level} level(s) to: Maximum Level`;
  }
}

// TODO: The five star major rewards pattern repeats, find a way to detect that pattern
export function getFiveStatus(level) {
  if (level < 451) {
    return `${451 - level} level(s) to Latest Legends Token`;
  } else if (level < 453 && level >= 451) {
    return `${453 - level} level(s) to 25 Command Points`;
  } else if (level < 455 && level >= 453) {
    return `${455 - level} level(s) to Latest Legends Token`;
  } else if (level < 457 && level >= 455) {
    return `${457 - level} level(s) to 25 Command Points`;
  } else if (level < 459 && level >= 457) {
    return `${459 - level} level(s) to Latest Legends Token`;
  } else if (level < 461 && level >= 459) {
    return `${461 - level} level(s) to 25 Command Points`;
  } else if (level < 461 && level >= 461) {
    return `${463 - level} level(s) to Latest Legends Token`;
  } else if (level < 465 && level >= 463) {
    return `${465 - level} level(s) to 25 Command Points`;
  } else if (level < 467 && level >= 465) {
    return `${467 - level} level(s) to Latest Legends Token`;
  } else {
    return 'Further 5* rewards forthcoming';
  }
}

// If both row and column index are zero, return zero
// If row index is zero, return column index
// If column index is zero, return row index times (column index  + 1)
// else, return  row index times column index

/*
function calculateCharIndex(rowIndex, columnIndex) {
  if (rowIndex === 0) {
    return columnIndex;
  }
  return rowIndex * columnIndex;
}
*/
