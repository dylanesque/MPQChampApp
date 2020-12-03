import { UpdateCharacter } from '../utils/graphql';
import Card from '@material-ui/core/Card';

const CharCard = ({ character }) => {
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
    <Card key={id}>
      <p>{name}</p>
      <img className="char-image" src={image} />
      <label>Character Level</label>
      <select onChange={nameChange} value={charLevel}>
        {charLevels.map((level) => {
          return <option key={level}>{level}</option>;
        })}
      </select>
      <div className="power-select">
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
