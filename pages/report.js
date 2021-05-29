import Card from '@material-ui/core/Card';
import { useQuery } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withApollo } from '../lib/withApollo';
import {
  getTwoStatus,
  getThreeStatus,
  getFourStatus,
  getFiveStatus,
  splitName,
} from '../utils/utils';
import { GET_CHARACTERS } from '../utils/graphql';
import { CharImage } from '../components/Card';
import { ReportChar } from '../components/ReportChar';
import { TierWrapper } from '../components/TierWrapper';

const Report = () => {
  let user;

  if (typeof window !== 'undefined') {
    user = sessionStorage.getItem('userKey');
  }
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });

  if (loading) return 'Loading...';
  if (error) return `An error has occurred: ${error}`;

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
    <TierWrapper>
        {fiveStars.map((char) => {
          const name = splitName(char.name);
          return (
            <ReportChar key={char.name}>
              <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                {name[0]}
              </p>
              <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                ({name[1]}
              </p>
              <CharImage src={char.image} alt={char.name} />
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
            </ReportChar>
          );
        })}
      </TierWrapper>
      <h2>Four Star Characters</h2>
      <TierWrapper
      >
        {fourStars.map((char) => {
          const name = splitName(char.name);
          return (
            <ReportChar key={char.name}>
              <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                {name[0]}
              </p>
              <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                ({name[1]}
              </p>
              <CharImage src={char.image} alt={char.name} />
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
            </ReportChar>
          );
        })}
      </TierWrapper>
      <h2>Three Star Characters</h2>
      <TierWrapper
      >
        {threeStars.map((char) => {
          const name = splitName(char.name);
          return (
            <ReportChar key={char.name}>
              <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                {name[0]}
              </p>
              <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                ({name[1]}
              </p>
              <CharImage src={char.image} alt={char.name} />
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
            </ReportChar>
          );
        })}
      </TierWrapper>
      <h2>Two Star Characters</h2>
      <TierWrapper
      >
        {twoStars.map((char) => {
          const name = splitName(char.name);
          return (
            <ReportChar key={char.name}>
              <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                {name[0]}
              </p>
              <p style={{ marginTop: '0rem', marginBottom: '0.5rem' }}>
                ({name[1]}
              </p>
              <CharImage src={char.image} alt={char.name} />
              <p>Level {char.char_level}</p>
              <p>{getTwoStatus(char.char_level, char.feedees)}</p>
            </ReportChar>
          );
        })}
      </TierWrapper>
    </div>
  );
};

export default withApollo()(Report);
