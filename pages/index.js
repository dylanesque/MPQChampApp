import { useQuery } from '@apollo/react-hooks';

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { withApollo } from '../lib/withApollo';
import { useFetchUser } from '../lib/user';
import Login from '../components/Auth/Login';
import LogoutBtn from '../components/Auth/Logout';
import CharCard from '../components/Card';
import Report from '../components/Report';
import CharacterGrid from '../components/CharacterGrid';
import { CHECK_CHAR_LIST, GET_CHARACTERS, AddDB } from '../utils/graphql';

const IndexPage = () => {
  // Variables
  let charCount = null;
  const { user, loading } = useFetchUser();

  // Queries
  const characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: 'auth0|5f9b45577305a20076914879' },
  });

  const dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: 'auth0|5f9b45577305a20076914879' },
  });

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

        <Tabs>
          <TabList>
            <Tab>Edit</Tab>
            <Tab>Report</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {characterDb.loading && <div>Loading...</div>}
              {characterDb.data && (
                <CharacterGrid>
                  {characterDb.data.characters.map((character) => {
                    return (
                      <CharCard key={character.id} character={character} />
                    );
                  })}
                </CharacterGrid>
              )}
            </TabPanel>
            <TabPanel>
              <Report characters={characterDb.data.characters} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {user && <LogoutBtn />}
      </>
    );
  }
};

export default withApollo()(IndexPage);
