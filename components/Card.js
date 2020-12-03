import { UpdateCharacter } from '../utils/graphql';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    display: 'inline-block',
    width: '100px',
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
  } = character;
  // set state for char_level & power levels
  // TODO: Refactor to remove duplication
  const [charLevel, setCharLevel] = React.useState(char_level);
  const [powerOneLevel, setPowerOneLevel] = React.useState(power_one_level);
  const [powerTwoLevel, setPowerTwoLevel] = React.useState(power_two_level);
  const [powerThreeLevel, setPowerThreeLevel] = React.useState(
    power_three_level
  );

  const powerLevels = [0, 1, 2, 3, 4, 5];

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
  return (
    <Card className={classes.root} key={id}>
      <p>{name}</p>
      <div className={classes.middle}>
        <img className={classes.image} src={image} />
        <div className={classes.powerSelect}>
          <label>Power One </label>
          <select onChange={powerOneChange} value={powerOneLevel}>
            {powerLevels.map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>
          <label>Power Two </label>
          <select onChange={powerTwoChange} value={powerTwoLevel}>
            {powerLevels.map((level) => {
              return <option key={level}>{level}</option>;
            })}
          </select>
          <label>Power Three </label>
          <select onChange={powerThreeChange} value={powerThreeLevel}>
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
