import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { UpdateCharacter } from '../utils/graphql';
import { calculateLevels } from '../utils/utils';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  levelSelect: {
    backGroundColor: 'gray'
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

const CharCard = ({ character, characters }) => {
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
  } = character;

  // TODO: Refactor to remove duplication
  const [charLevel, setCharLevel] = React.useState(char_level);
  const [powerOneLevel, setPowerOneLevel] = React.useState(power_one_level);
  const [powerTwoLevel, setPowerTwoLevel] = React.useState(power_two_level);
  const [powerThreeLevel, setPowerThreeLevel] = React.useState(
    power_three_level
  );

  const [powerLevelState, setPowerLevelState] = React.useState(
    powerOneLevel + powerTwoLevel + powerThreeLevel
  );

  // TODO: selectable power levels should be limited to 13 minus the total of the other two power levels, up to 5
  const powerLevels = [0, 1, 2, 3, 4, 5];

  // TODO: Refactor this value to be a derived value based on rarity and number of covers
  const charLevels = calculateLevels(rarity);

  function levelChange(e) {
    setCharLevel(parseInt(e.target.value));
  }
  function powerOneChange(e) {
    console.log(powerLevelState);
    setPowerOneLevel(parseInt(e.target.value));
    setPowerLevelState(powerOneLevel + powerTwoLevel + powerThreeLevel);
  }
  function powerTwoChange(e) {
    console.log(powerLevelState);
    setPowerTwoLevel(parseInt(e.target.value));
    setPowerLevelState(powerOneLevel + powerTwoLevel + powerThreeLevel);
  }
  function powerThreeChange(e) {
    console.log(powerLevelState);
    setPowerThreeLevel(parseInt(e.target.value));
    setPowerLevelState(powerOneLevel + powerTwoLevel + powerThreeLevel);
  }

  function generateColors(color) {
    let palette;
    switch (color) {
      case 'red':
        palette = { color: 'white', backgroundColor: 'fireBrick' };
        break;
      case 'yellow':
        palette = { color: 'black', backgroundColor: 'goldenRod' };
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
          src={image}
          alt="Cover picture for ${name}"
        />
        <div className={classes.powerSelect}>
          <select
            className="power-select"
            aria-label="Power One Color"
            style={generateColors(`${power_one_color}`)}
            onChange={powerOneChange}
            value={powerOneLevel}
          >
            {powerLevels.map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>

          <select
            className="power-select"
            aria-label="Power Two Color"
            style={generateColors(`${power_two_color}`)}
            onChange={powerTwoChange}
            value={powerTwoLevel}
          >
            {powerLevels.map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>

          <select
            className="power-select"
            aria-label="Power Three Color"
            style={generateColors(`${power_three_color}`)}
            onChange={powerThreeChange}
            value={powerThreeLevel}
          >
            {powerLevels.map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>
        </div>
      </div>
      <label htmlFor={name}>Character Level</label>
      <select
        id={name}
        onChange={levelChange}
        value={charLevel}
      >
        {charLevels.map((level) => {
          return <option key={level}>{level}</option>;
        })}
      </select>

      <UpdateCharacter
        characters={characters}
        id={id}
        changes={{
          char_level: charLevel,
          power_one_level: powerOneLevel,
          power_two_level: powerTwoLevel,
          power_three_level: powerThreeLevel,
        }}
      />
    </Card>
  );
};

export default CharCard;
