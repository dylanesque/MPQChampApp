import Card from '@material-ui/core/Card';


const Report = ({ characters }) => {
  const activeCharacters = characters.filter(
    (character) =>
      character.power_one_level >= 1 ||
      character.power_two_level >= 1 ||
      character.power_three_level >= 1
  );
  const fiveStars = activeCharacters
    .filter((character) => character.rarity === 5)
    .sort((a, b) => b.char_level - a.char_level);
  // flag for how far a character is from shards, covers, or 10 or more CP
  const fourStars = activeCharacters
    .filter((character) => character.rarity === 4)
    .sort((a, b) => b.char_level - a.char_level);
  // flag for how far a character is from shards, covers, or 10 or more CP
  const threeStars = activeCharacters
    .filter((character) => character.rarity === 3)
    .sort((a, b) => b.char_level - a.char_level);
  // flag for far a character is from feedee covers and 8 or more CP
  const twoStars = activeCharacters
    .filter((character) => character.rarity === 2)
    .sort((a, b) => b.char_level - a.char_level);


  function getTwoStatus(level, feedee) {
    if (level === 144) {
      return 'Maximum Level'
    } else {
      if (level < 143 && level >= 139) {
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
  }
  return (
    <>
      <h2>Five Star Characters</h2>
      <div
        style={{
          display: 'flex ',
          flexDirection: 'row',
          marginLeft: '1rem',
          overflow: 'auto',
        }}
      >
        {fiveStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
                minWidth: '240px',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0.5rem',
              }}
            >
              <p>{char.name}</p>
              <img className="char-image" src={char.image} />
              <p>Level {char.char_level}</p>
            </Card>
          );
        })}
      </div>
      <h2>Four Star Characters</h2>
      <div
        style={{
          display: 'flex ',
          flexDirection: 'row',
          marginLeft: '1rem',
          overflow: 'auto',
        }}
      >
        {fourStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
                minWidth: '240px',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0.5rem',
              }}
            >
              <p>{char.name}</p>
              <img className="char-image" src={char.image} />
              <p>Level {char.char_level}</p>
            </Card>
          );
        })}
      </div>
      <h2>Three Star Characters</h2>
      <div
        style={{
          display: 'flex ',
          flexDirection: 'row',
          marginLeft: '1rem',
          overflow: 'auto',
        }}
      >
        {threeStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
                minWidth: '240px',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0.5rem',
              }}
            >
              <p>{char.name}</p>
              <img className="char-image" src={char.image} />
              <p>Level {char.char_level}</p>
            </Card>
          );
        })}
      </div>
      <h2>Two Star Characters</h2>
      <div
        style={{
          display: 'flex ',
          flexDirection: 'row',
          marginLeft: '1rem',
          overflow: 'auto',
        }}
      >
        {twoStars.map((char) => {
          console.log(char);
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
                minWidth: '240px',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0.5rem',
              }}
            >
              <p>{char.name}</p>
              <img className="char-image" src={char.image} />
              <p>Level {char.char_level}</p>
              <p>Status</p>
              <p>{getTwoStatus(char.char_level, char.feedees)}</p>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Report;
