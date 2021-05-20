import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/withApollo';
import {
  Card,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';

import CharCard from '../components/Card';
import CharacterGrid from '../components/CharacterGrid';
import { CHECK_CHAR_LIST, GET_CHARACTERS, AddDB } from '../utils/graphql';
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
  let dbCheck = useQuery(CHECK_CHAR_LIST, {
    variables: { id: user },
  });

  const handleChange = (event) => {
    localStorage.setItem('selectedRarity', parseInt(event.target.value));
    return setSelectedRarity(parseInt(event.target.value));
  };

  if (dbCheck.error) {
    return `An unexpected error occurred: ${dbCheck.error}`;
  }

  if (!dbCheck.loading) {
    charCount = dbCheck.data.users[0].characters_aggregate.aggregate.count;
  }

  let characterDb = useQuery(GET_CHARACTERS, {
    variables: { user_id: user },
  });

  if (characterDb.loading) {
    return (
      <div className="loading-page">
        <Card
          style={{
            borderRadius: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '72px 80px',
          }}
        >
          <CircularProgress />
          <p
            style={{
              marginTop: '1rem',
              display: 'inline-block',
              paddingRight: '8px',
            }}
          >
            Loading
          </p>
        </Card>
      </div>
    );
  }

  // TODO: Bolster this functionality so that it not only checks for empty databases, but databases that
  // are less than the current character count, and updates the missing character(s)
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
    function filterByRarity(rarity) {
      return characterDb.data.characters.filter(
        (char) => char.rarity == rarity
      );
    }

    const selectedChars = filterByRarity(selectedRarity);
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
