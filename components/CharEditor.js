import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/withApollo';
import { Card, CircularProgress } from '@material-ui/core';

import CharCard from '../components/Card';
import CharacterGrid from '../components/CharacterGrid';
import { CHECK_CHAR_LIST, GET_CHARACTERS, AddDB } from '../utils/graphql';

const CharEdit = ({ user }) => {
  let charCount = null;
  let dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: user },
  });

  if (dbCheck.error) {
    return `An unexpected error occurred: ${dbCheck.error}`
  }

  if (!dbCheck.loading) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  let characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });

  if (!characterDb.loading) {
    return (
      <div className="loading-page">
        <Card style={{ borderRadius: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '72px 80px' }}>
          <CircularProgress />
          <p style={{ marginTop: '1rem', display: 'inline-block', paddingRight: '8px' }}>Loading</p>
        </Card>
      </div>
    );
  }

  if (charCount === 0) {
    return (
      <div className="login-page">
        <p style={{ backgroundColor: 'white', padding: '1rem' }}>
          We're detecting that you haven't set up a seed database yet. Please
          click the button below to get started!
        </p>
        <AddDB user={user} />
      </div>
    );
  } else if (characterDb.error) {
    return <h3>{characterDb.error}</h3>;
  } else {
    console.log(characterDb.client.cache);
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Edit Roster</h2>
        {characterDb.loading && <div>Loading...</div>}
        {characterDb.data && (
          <CharacterGrid>
            {characterDb.data.characters.map((character) => {
              return (
                <CharCard
                  user={user}
                  key={character.id}
                  character={character}
                  characters={characterDb}
                />
              );
            })}
          </CharacterGrid>
        )}
      </>
    );
  }
};

export default withApollo()(CharEdit);
