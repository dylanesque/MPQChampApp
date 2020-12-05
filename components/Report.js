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
  const fourStars = activeCharacters
    .filter((character) => character.rarity === 4)
    .sort((a, b) => b.char_level - a.char_level);
  const threeStars = activeCharacters
    .filter((character) => character.rarity === 3)
    .sort((a, b) => b.char_level - a.char_level);
  const twoStars = activeCharacters
    .filter((character) => character.rarity === 2)
    .sort((a, b) => b.char_level - a.char_level);
  return (
    <>
      <h2>Five Star Characters</h2>
      <div
        style={{ display: 'flex ', flexDirection: 'row', marginLeft: '1rem' }}
      >
        {fiveStars.map((char) => {
          return (
            <Card style={{ display: 'flex ', flexDirection: 'column', alignItems: 'center', marginRight: '1rem', padding: '0.5rem' }}>
              <p>{char.name}</p>
              <img className="char-image" src={char.image} />
              <p>Level {char.char_level}</p>
            </Card>
          );
        })}
      </div>
      <h2>Four Star Characters</h2>
      <div
        style={{ display: 'flex ', flexDirection: 'row', marginLeft: '1rem' }}
      >
        {fourStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
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
        style={{ display: 'flex ', flexDirection: 'row', marginLeft: '1rem' }}
      >
        {threeStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
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
        style={{ display: 'flex ', flexDirection: 'row', marginLeft: '1rem' }}
      >
        {twoStars.map((char) => {
          return (
            <Card
              style={{
                display: 'flex ',
                flexDirection: 'column',
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
    </>
  );
};

export default Report;
