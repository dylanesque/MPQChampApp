import Card from '@material-ui/core/Card';
import { useQuery } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withApollo } from '../lib/withApollo';
import { getTwoStatus, getThreeStatus, getFourStatus, getFiveStatus, splitName } from '../utils/utils';
import { GET_CHARACTERS } from '../utils/graphql';


const Report = () => {
  let user;

  if (typeof window !== 'undefined') {
    user = localStorage.getItem('userKey');
  }
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });

  if (loading) return 'Loading...';
  if (error) return `An error has occurred: ${error}`

  const activeCharacters = data.characters.filter(
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
      <div className="index-background">
        <h1 style={{ textAlign: 'center' }}>Roster Report</h1>
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
            const name = splitName(char.name);
            return (
              <Card
                key={char.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '240px',
                  alignItems: 'center',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.25rem',
                }}
              >
                <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                  {name[0]}
                </p>
                <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                  ({name[1]}
                </p>
                <img className="char-image" src={char.image} alt={char.name} />
                <p>Level {char.char_level}</p>
                <p>{getFiveStatus(char.char_level)}</p>
                <p>
                  Shards: {char.shards} / {char.rarity * 100}
                </p>
                <div style={{ width: '55%' }}>
                  <LinearProgress
                    aria-label="shard progress"
                    variant="determinate"
                    value={char.shards / char.rarity}
                  />
                </div>
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
            const name = splitName(char.name);
            return (
              <Card
                key={char.name}
                style={{
                  display: 'flex ',
                  flexDirection: 'column',
                  minWidth: '240px',
                  alignItems: 'center',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.25rem',
                }}
              >
                <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                  {name[0]}
                </p>
                <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                  ({name[1]}
                </p>
                <img className="char-image" src={char.image} alt={char.name} />
                <p>Level {char.char_level}</p>
                <p>{getFourStatus(char.char_level, char.feedees)}</p>
                <p>
                  Shards: {char.shards} / {char.rarity * 100}
                </p>
                <div style={{ width: '55%' }}>
                  <LinearProgress
                    aria-label="shard progress"
                    variant="determinate"
                    value={char.shards / char.rarity}
                  />
                </div>
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
            const name = splitName(char.name);
            return (
              <Card
                key={char.name}
                style={{
                  display: 'flex ',
                  flexDirection: 'column',
                  minWidth: '240px',
                  alignItems: 'center',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.25rem',
                }}
              >
                <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                  {name[0]}
                </p>
                <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                  ({name[1]}
                </p>
                <img className="char-image" src={char.image} alt={char.name} />
                <p>Level {char.char_level}</p>
                <p>{getThreeStatus(char.char_level, char.feedees)}</p>
                <p>
                  Shards: {char.shards} / {char.rarity * 100}
                </p>
                <div style={{ width: '55%' }}>
                  <LinearProgress
                    aria-label="shard progress"
                    variant="determinate"
                    value={char.shards / char.rarity}
                  />
                </div>
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
            const name = splitName(char.name);
            return (
              <Card
                key={char.name}
                style={{
                  display: 'flex ',
                  flexDirection: 'column',
                  minWidth: '240px',
                  alignItems: 'center',
                  marginRight: '1rem',
                  marginBottom: '1rem',
                  padding: '0.25rem',
                }}
              >
                <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                  {name[0]}
                </p>
                <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                  ({name[1]}
                </p>
                <img className="char-image" src={char.image} alt={char.name} />
                <p>{char.feedees}</p>
                <p>Level {char.char_level}</p>
                <p>{getTwoStatus(char.char_level, char.feedees)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    );
};

export default withApollo()(Report);
