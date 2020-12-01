import { useQuery } from '@apollo/react-hooks';

import { useFetchUser } from '../lib/user';
import { withApollo } from '../lib/withApollo';
import Login from '../components/Auth/Login';
import parseFeeds from '../utils/parse';
import Card from '../components/Card'
import {
  CHECK_CHAR_LIST,
  GET_CHARACTERS,
  AddDB,
} from '../utils/graphql';

const IndexPage = () => {
  // Variables
  let charCount = null;

  
  // Queries
  const characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: 'auth0|5f9b45577305a20076914879' },
  });
  const { user, loading } = useFetchUser();
  const dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: 'auth0|5f9b45577305a20076914879' },
  });



  // Apollo queries database to see if the user has any characters
  // TODO: Test this query
  // 1. Query db for a characters table for this user

  // 2. If the above query is complete, check to see if the number of characters in the db is greater than zero
  if (!dbCheck.loading && user) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !user) {
    return <Login />;
  } else {
    return (
      <>
        <h1>Welcome to the Marvel Puzzle Quest Champion Tracker!</h1>
        <div>You have {charCount} characters right now</div>
        {charCount < 1 && !characterDb.data.characters && <AddDB />}

        {characterDb.loading && <div>Loading...</div>}
        {characterDb.data && (
          <div>
            {characterDb.data.characters.map((character) => {
              return (
                <Card key={character.id} character={character} />
              );
            })}
          </div>
        )}
      </>
    );
  }
};

export default withApollo()(IndexPage);
