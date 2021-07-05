import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

import { UpdateCharacter } from '../utils/graphql';
import { calculateDynamicLevelRange, splitName } from '../utils/utils';
import { CenterCard } from '../components/CardCenter'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    textAlign: 'center',
    width: '300px'
  },
  levelSelect: {
    backGroundColor: 'gray',
  },
  name: {
    marginTop: '0.5rem',
    marginBottom: '0'
  },
  subtitle: {
    marginTop: '0',
    marginBottom: '0.5rem',
  },
  powerSelect: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1.25rem',
  },
});

const CharCard = ({ character, characters, user }) => {
  const classes = useStyles();
  const {
    id,
    name,
    char_level,
    image,
    power_one_level,
    power_two_level,
    power_three_level,
    power_one_color,
    power_two_color,
    power_three_color,
    rarity,
    shards,
  } = character;

  const [state, dispatch] = React.useReducer(reducer, {
    powerOneLevel: power_one_level,
    powerTwoLevel: power_two_level,
    powerThreeLevel: power_three_level,
    powerOneLimit: 13 - (power_two_level + power_three_level),
    powerTwoLimit: 13 - (power_one_level + power_three_level),
    powerThreeLimit: 13 - (power_two_level + power_one_level),
    totalPowers: power_one_level + power_two_level + power_three_level,
    charLevel: char_level,
  });

  const [shardCount, setShardCount] = React.useState(shards);
  const fullName = splitName(name);
  const powerLevels = [0, 1, 2, 3, 4, 5];
  const charLevels = calculateDynamicLevelRange(rarity, state.totalPowers);

  function reducer(state, action) {
    switch (action.type) {
      case 'one':
        return {
          ...state,
          powerOneLevel: +action.payload,
          powerTwoLimit: 13 - (+action.payload + state.powerThreeLevel),
          powerThreeLimit: 13 - (+action.payload + state.powerTwoLevel),
          totalPowers:
            +action.payload + state.powerTwoLevel + state.powerThreeLevel,
        };
      case 'two':
        return {
          ...state,
          powerTwoLevel: +action.payload,
          powerOneLimit: 13 - (+action.payload + state.powerThreeLevel),
          powerThreeLimit: 13 - (+action.payload + state.powerOneLevel),
          totalPowers:
            +action.payload + state.powerOneLevel + state.powerThreeLevel,
        };
      case 'three':
        return {
          ...state,
          powerThreeLevel: +action.payload,
          powerOneLimit: 13 - (+action.payload + state.powerTwoLevel),
          powerTwoLimit: 13 - (+action.payload + state.powerOneLevel),
          totalPowers:
            +action.payload + state.powerTwoLevel + state.powerOneLevel,
        };
      case 'level':
        return {
          ...state,
          charLevel: +action.payload,
        };
      default:
        throw new Error();
    }
  }

  function shardChange(e) {
    e.preventDefault();
    setShardCount(e.target.value);
  }

  function generateColors(color) {
    let palette;
    switch (color) {
      case 'red':
        palette = { color: 'white', backgroundColor: 'fireBrick' };
        break;
      case 'yellow':
        palette = { color: 'white', backgroundColor: 'goldenrod' };
        break;
      case 'blue':
        palette = { color: 'white', backgroundColor: '#00c' };
        break;
      case 'black':
        palette = { color: 'white', backgroundColor: '#222' };
        break;
      case 'green':
        palette = { color: 'white', backgroundColor: 'green' };
        break;
      case 'purple':
        palette = { color: 'white', backgroundColor: 'purple' };
        break;
    }
    return palette;
  }
  return (
    <Card className={classes.root} key={id}>
      <p className={classes.name}>{fullName[0]}</p>
      <p className={classes.subtitle}>({fullName[1]}</p>
     <CenterCard>
        <CharImage
          src={`/${image}`}
          loading="lazy"
          decoding="async"
          alt={`Cover picture for ${name}`}
        />
        <div className={classes.powerSelect}>
          <PowerSelect
            type="number"
            min="0"
            max={state.powerOneLimit}
            aria-label="Power One Color"
            style={generateColors(`${power_one_color}`)}
            onChange={(event) =>
              dispatch({ type: 'one', payload: event.target.value })
            }
            value={state.powerOneLevel}
          />
          <PowerSelect
            type="number"
            min="0"
            max={state.powerTwoLimit}
            aria-label="Power Two Color"
            style={generateColors(`${power_two_color}`)}
            onChange={(event) =>
              dispatch({ type: 'two', payload: event.target.value })
            }
            value={state.powerTwoLevel}
          />

          <PowerSelect
            type="number"
            min="0"
            max={state.powerThreeLimit}
            aria-label="Power Three Color"
            style={generateColors(`${power_three_color}`)}
            onChange={(event) =>
              dispatch({ type: 'three', payload: event.target.value })
            }
            value={state.powerThreeLevel}
          />
        </div>
      </CenterCard>
      <label htmlFor={name}>Character Level</label>
      <input
        type="number"
        min={charLevels[0]}
        max={charLevels[1]}
        id={name}
        onChange={(event) =>
          dispatch({ type: 'level', payload: event.target.value })
        }
        value={state.charLevel}
      />
      <div
        style={{
          visibility: rarity < 3 ? 'hidden' : 'visible',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label htmlFor={name + 'shards'}>Shards</label>
        <input
          onChange={shardChange}
          autoFocus
          style={{ marginBottom: '1rem' }}
          type="number"
          id={name + 'shards'}
          name="shards"
          value={shardCount}
          min="0"
          max={rarity * 100}
        />
      </div>
      <UpdateCharacter
        characters={characters}
        user={user}
        id={id}
        changes={{
          char_level: state.charLevel,
          power_one_level: state.powerOneLevel,
          power_two_level: state.powerTwoLevel,
          power_three_level: state.powerThreeLevel,
          shards: shardCount,
        }}
      />
    </Card>
  );
};

const PowerSelect = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  outline: 0;
  margin: 0.1rem 0.1rem 0.1rem 1rem;
  padding: 0.75rem;
  width: 6rem;
`;

export const CharImage = styled.img`
  align-self: center;
  display: inline-block;
  margin-top: 0.5rem;
  width: 84.5px;
  height: 127px;
`;


export default CharCard;
