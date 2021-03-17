import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { UpdateCharacter } from '../utils/graphql';
import { calculateLevels } from '../utils/utils';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    textAlign: 'center',
  },
  levelSelect: {
    backGroundColor: 'gray',
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    marginTop: '0.5rem',
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

  // Changing Char Levels

  // 1) When a power level is incremented or decremented, that change is reflected in state in the
  // form of state variables that track the value of 13 minus the sum of the other two power levels. (DONE)

  // 2) For each power, this function compares the current power level against the difference
  // of 13 and the sum of the other two power levels.

  // 3) If that difference changes between 5 or greater/less than 5, then the function will recalculate
  // the maximum possible selectable level for that power as appropriate in that particular instance.

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

  // TODO: selectable power levels should be limited to 13 minus the total of the other two power levels, up to 5
  const powerLevels = [0, 1, 2, 3, 4, 5];

  // TODO: Refactor this value to be a derived value based on rarity and number of covers
  const charLevels = calculateLevels(rarity);

  function calculatedLevels(limit) {
    if (limit >= 5) {
      return powerLevels;
    } else if (limit == 4) {
      return powerLevels.slice(0, 5);
    } else {
      return powerLevels.slice(0, 4);
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
        palette = { color: 'white', backgroundColor: '#bb9125' };
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
      <p className={classes.name}>{name}</p>
      <div className={classes.middle}>
        <img
          className="char-image"
          src={`/${image}`}
          loading="lazy"
          decoding="async"
          alt={`Cover picture for ${name}`}
        />
        <div className={classes.powerSelect}>
          <select
            className="power-select"
            aria-label="Power One Color"
            style={generateColors(`${power_one_color}`)}
            onChange={(event) =>
              dispatch({ type: 'one', payload: event.target.value })
            }
            value={state.powerOneLevel}
          >
            {calculatedLevels(state.powerOneLimit).map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>

          <select
            className="power-select"
            aria-label="Power Two Color"
            style={generateColors(`${power_two_color}`)}
            onChange={(event) =>
              dispatch({ type: 'two', payload: event.target.value })
            }
            value={state.powerTwoLevel}
          >
            {calculatedLevels(state.powerTwoLimit).map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>

          <select
            className="power-select"
            aria-label="Power Three Color"
            style={generateColors(`${power_three_color}`)}
            onChange={(event) =>
              dispatch({ type: 'three', payload: event.target.value })
            }
            value={state.powerThreeLevel}
          >
            {calculatedLevels(state.powerThreeLimit).map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>
        </div>
      </div>
      <label htmlFor={name}>Character Level</label>
      <select
        id={name}
        onChange={(event) =>
          dispatch({ type: 'level', payload: event.target.value })
        }
        value={state.charLevel}
      >
        {charLevels.map((level) => {
          return <option key={level}>{level}</option>;
        })}
      </select>
      {rarity > 2 && (
        <>
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
        </>
      )}
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

export default CharCard;
