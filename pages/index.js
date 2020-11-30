import { useQuery } from '@apollo/react-hooks';

import { useFetchUser } from '../lib/user';
import { withApollo } from '../lib/withApollo';
import Login from '../components/Auth/Login';
import parseFeeds from '../utils/parse';
import {
  CHECK_CHAR_LIST,
  GET_CHARACTERS,
} from '../utils/graphql';

const IndexPage = () => {
  let charCount = null;
  const characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: 'auth0|5f9b45577305a20076914879' },
  });
  const powerLevels = [0, 1, 2, 3, 4, 5];
  const charLevels = [...Array(400).keys()];

  const { user, loading } = useFetchUser();
  const dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: 'auth0|5f9b45577305a20076914879' },
  });

  // https://stackoverflow.com/questions/60899880/next-js-reduce-data-fetching-and-share-data-between-pages

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

        {characterDb.loading && <div>Loading...</div>}
        {characterDb.data && (
          <div>
            {characterDb.data.characters.map((character) => {
              return (
                <div key={character.id}>
                  <p>{character.name}</p>
                  <label>Character Level</label>
                  <select>
                    {charLevels.map((level) => {
                      return <option>{level}</option>;
                    })}
                  </select>
                  <div className="power-select">
                    <label>Power One </label>
                    <select>
                      {powerLevels.map((level) => {
                        return <option>{level}</option>;
                      })}
                    </select>
                    <label>Power Two </label>
                    <select>
                      {powerLevels.map((level) => {
                        return <option>{level}</option>;
                      })}
                    </select>
                    <label>Power Three </label>
                    <select>
                      {powerLevels.map((level) => {
                        return <option>{level}</option>;
                      })}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
};

export default withApollo()(IndexPage);
