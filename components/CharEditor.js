import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/withApollo';
import { useVirtual } from 'react-virtual';
import { useRef, useCallback } from 'react';

import CharCard from '../components/Card';
import Report from '../components/Report';

import { CHECK_CHAR_LIST, GET_CHARACTERS, AddDB } from '../utils/graphql';

const CharEdit = ({ user }) => {
  // Declare vars for columns and rows
  const columns = Math.round(window.innerWidth / 210);
  const rows = Math.round(170 / columns);
  
  // Number of characters in user's db
  let charCount = null;
  // Fetches
  let dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: user },
  });

  if (!dbCheck.loading) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  let characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });


  if (characterDb.loading) {
    return <div>Loading....</div>;
  } else if (charCount === 0) {
    return <AddDB user={user} />;
  } else {
    return (
      <>
        <Tabs>
          <TabList style={{ display: 'flex', justifyContent: 'center' }}>
            <Tab className="white" style={{ marginRight: '0.75rem' }}>
              Edit
            </Tab>
            <Tab className="white">Roster</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {characterDb.loading && <div>Loading...</div>}
              {characterDb.data && (
                <main className="character-grid"
                >
                  {characterDb.data.characters.map((character) => {
                    return (
                      <CharCard key={character.id} character={character} />
                    );
                  })}
                </main>
              )}
            </TabPanel>
            <TabPanel>
              <Report characters={characterDb.data.characters} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }
};

export default withApollo()(CharEdit);
