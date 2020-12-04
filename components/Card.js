import { UpdateCharacter } from '../utils/graphql';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    display: 'inline-block',
    width: '95px',
    height: '125px',
  },
  powerSelect: {
    display: 'flex',
    flexDirection: 'column',

    paddingBottom: '1.5rem',
  },
});

const CharCard = ({ character }) => {
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
    rarity
  } = character;

  // TODO: Refactor to remove duplication
  const [charLevel, setCharLevel] = React.useState(char_level);
  const [powerOneLevel, setPowerOneLevel] = React.useState(power_one_level);
  const [powerTwoLevel, setPowerTwoLevel] = React.useState(power_two_level);
  const [powerThreeLevel, setPowerThreeLevel] = React.useState(
    power_three_level
  );

  const powerLevels = [0, 1, 2, 3, 4, 5];
  const totalLevel = powerOneLevel + powerTwoLevel + powerThreeLevel;

  // TODO: Refactor this value to be a derived value based on rarity and number of covers
  const charLevels = [...Array(400).keys()];

  function nameChange(e) {
    setCharLevel(e.target.value);
  }
  function powerOneChange(e) {
    setPowerOneLevel(e.target.value);
  }
  function powerTwoChange(e) {
    setPowerTwoLevel(e.target.value);
  }
  function powerThreeChange(e) {
    setPowerThreeLevel(e.target.value);
  }

  function generateColors(color) {
    let palette;
    switch (color) {
      case 'red':
        palette = { color: 'white', backgroundColor: 'red' };
        break;
      case 'yellow':
        palette = { color: 'black', backgroundColor: 'yellow' };
        break;
      case 'blue':
        palette = { color: 'white', backgroundColor: 'blue' };
        break;
      case 'black':
        palette = { color: 'white', backgroundColor: 'black' };
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
      <p>{name}</p>
      <div className={classes.middle}>
        <img className={classes.image} src={image} />
        <div className={classes.powerSelect}>
          <select
            className="power-select"
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
      <label>Character Level</label>
      <select onChange={nameChange} value={charLevel}>
        {charLevels.map((level) => {
          return <option key={level}>{level}</option>;
        })}
      </select>

      <UpdateCharacter
        id={id}
        changes={{
          char_level: parseInt(charLevel),
          power_one_level: parseInt(powerOneLevel),
          power_two_level: parseInt(powerTwoLevel),
          power_three_level: parseInt(powerThreeLevel),
        }}
      />
    </Card>
  );
};

export default CharCard;
