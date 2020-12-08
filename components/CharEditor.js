import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/withApollo';
import { useEffect } from 'react';

import CharCard from '../components/Card';
import Report from '../components/Report';
import CharacterGrid from '../components/CharacterGrid';
import { CHECK_CHAR_LIST, GET_CHARACTERS, AddDB } from '../utils/graphql';

const CharEdit = ({ user }) => {
  // Number of characters in user's db  
    let charCount = null;
  // Fetches 
  let characterDb = (characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  }));
  let dbCheck = (dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: user },
  }));

  if (!dbCheck.loading) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  if (characterDb.loading) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
        <Tabs>
          <TabList style={{ display: 'flex', justifyContent: 'center' }}>
            <Tab style={{ marginRight: '0.75rem' }}>Edit</Tab>
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
      </>
    );
  }
};

export default withApollo()(CharEdit);
