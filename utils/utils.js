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
export default function parseFeeds(data) {
  if (data === 'none') {
    return;
  } else if (!data.includes(',')) {
    return [parseInt(data)];
  } else {
    return [data.split(',')];
  }
}

// Calculates next major reward for two star characters
 export default function getTwoStatus(level, feedee) {

   if (level === 144) {
     return 'Champion Maxed';
   } else if (level < 143 && level >= 139) {
       return `${143 - level} levels to: Mighty Recruit Token`;
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

export default function getThreeStatus(level, feedee) {
  const feedees = parseFeeds(feedee);
  if (level === 266) {
    return 'Champion Maxed';
  } else if (level === 265 || level === 256) {
    return '1 level to: Latest Legends token'
  } else if (level < 265 && level >= 261) {
    return `${265 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level === 260) {
    return '1 level to: 15 Command Points';
  } else if (level === 259 || level === 219) {
    return `1 level to: ${feedees[1]} shards`;
  } else if (level < 258 && level >= 256) {
    return `${258 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 255 && level >= 250) {
    return `${255 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 250 && level >= 247) {
    return `${250 - level} level(s) to: ${feedees[1]} shards`;
  }  else if (level < 247 && level >= 243) {
    return `${247 - level} level(s) to: 8 Command Points`;
  } else if (level < 243 && level >= 240) {
    return `${243 - level} level(s) to: Mighty Recruit Token`;
  } else if (level === 239) {
    return `1 level to: ${feedees[1]} shards`;
  } else if (level < 239 && level >= 235) {
    return `${239 - level} level(s) to: Latest Legends Token`;
  } else if (level < 235 && level >= 230) {
    return `${239 - level} level(s) to: 5 Command Points`;
  } else if (level < 230 && level >= 227) {
    return `${230 - level} level(s) to: ${feedees[1]} shards`;
  } else if (level < 227 && level >= 223) {
    return `${227 - level} level(s) to: Latest Legends Token`;
  } else if (level < 223 && level >= 220) {
    return `${223 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 219 && level >= 215) {
    return `${219 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 215 && level >= 210) {
    return `${215 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 210 && level >= 207) {
    return `${210 - level} level(s) to: ${feedees[1]} shards`;
  } else if (level < 207 && level >= 200) {
    return `${207 - level} level(s) to: Mighty Recruit Token`;
  } else if (level < 200 && level >= 190) {
    return `${200 - level} level(s) to: ${feedees[1]} shards`;
  } else if (level < 190 && level >= 183) {
    return `${190 - level} level(s) to: ${feedees[1]} shards`;
  } else if (level < 183 && level >= 180) {
    return `${183 - level} level(s) to: ${feedees[0]} shards`;
  } else if (level < 180 && level >= 170) {
    return `${180 - level} level(s) to: ${feedees[1]} shards`;
  } else if (level < 170 && level >= 167) {
    return `${170 - level} level(s) to: ${feedees[1]} shards`;
  } else {
    return `${167 - level} level(s) to: Latest Legends Token`;
  }
}

