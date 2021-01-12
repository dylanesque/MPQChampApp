import Card from '@material-ui/core/Card';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../lib/withApollo';
import { useFetchUser } from '../lib/user';
import { getTwoStatus, getThreeStatus, getFourStatus } from '../utils/utils';
import { GET_CHARACTERS } from '../utils/graphql';

const Report = () => {
   // const { user, loading } = useFetchUser();
  let user;
  if (typeof window !== 'undefined') {
    user = localStorage.getItem('userKey');
  }


  let characters = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });
  const activeCharacters = characters.data.characters.filter(
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
  
  if (loading) {
    return <div>Loading...</div>;
  } else {

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
            return (
              <Card
                key={char.name}
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
                key={char.name}
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
                <p>{getFourStatus(char.char_level, char.feedees)}</p>
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
                key={char.name}
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
                <p>{getThreeStatus(char.char_level, char.feedees)}</p>
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
            return (
              <Card
                key={char.name}
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
                <p>{getTwoStatus(char.char_level, char.feedees)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
};

export default withApollo()(Report);
