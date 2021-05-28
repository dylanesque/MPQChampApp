import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/withApollo';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';

import CharCard from '../components/Card';
import CharacterGrid from '../components/CharacterGrid';
import { LoadingPage } from './LoadingPage';
import {
  CHECK_CHAR_LIST,
  GET_CHARACTERS,
  AddDB,
  AddNewChars,
} from '../utils/graphql';
import { seedDB } from '../db/seed';

const CharEdit = ({ user }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[700],
      },
    },
  });
  const [selectedRarity, setSelectedRarity] = React.useState(
    parseInt(localStorage.getItem('selectedRarity')) || 2
  );

  let charCount = null;
  let selectedChars = null;
  let dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: user },
  });
  let characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });

  function handleChange(event) {
    localStorage.setItem('selectedRarity', parseInt(event.target.value));
    return setSelectedRarity(parseInt(event.target.value));
  };

  function filterByRarity(rarity) {
    return characterDb.data.characters.filter((char) => char.rarity == rarity);
  }

  if (dbCheck.error) {
    return `An unexpected error occurred: ${dbCheck.error}`;
  }

  if (!dbCheck.loading) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  if (characterDb.loading) {
    return (
    <LoadingPage />
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
  } else if (!characterDb.loading && charCount < seedDB.length) {
    return (
      <div className="login-page">
        <p style={{ backgroundColor: 'white', padding: '1rem' }}>
          New characters have been added to the application! Click the button
          below to add them to your lineup!
        </p>
        <AddNewChars user={user} chars={characterDb.data.characters} />
      </div>
    );
  } else if (characterDb.error) {
    return <h3>{characterDb.error}</h3>;
  } else {
    selectedChars = filterByRarity(selectedRarity);
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Edit Roster</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            color: 'black',
            maxWidth: '60%',
            margin: '0 auto',
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Select Rarity</h3>
          <ThemeProvider theme={theme}>
            <RadioGroup
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '24px',
              }}
              aria-label="rarity"
              name="char-rarity"
              value={selectedRarity}
              onChange={handleChange}
            >
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="Two Star"
                checked={selectedRarity === 2}
              />
              <FormControlLabel
                value="3"
                control={<Radio color="primary" />}
                label="Three Star"
                checked={selectedRarity === 3}
              />
              <FormControlLabel
                value="4"
                control={<Radio color="primary" />}
                label="Four Star"
                checked={selectedRarity === 4}
              />
              <FormControlLabel
                value="5"
                control={<Radio color="primary" />}
                label="Five Star"
                checked={selectedRarity === 5}
              />
            </RadioGroup>
          </ThemeProvider>
        </div>
        {characterDb.loading && <div>Loading...</div>}
        {characterDb.data && (
          <CharacterGrid>
            {selectedChars.map((character) => {
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
