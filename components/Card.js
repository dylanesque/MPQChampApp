import { UpdateCharacter } from '../utils/graphql';

const Card = ({ character }) => {
  const {
    id,
    name,
    char_level,
    power_one_level,
    power_two_level,
    power_three_level,
  } = character;
  // set state for char_level & power levels
  const [charLevel, setCharLevel] = React.useState(char_level);
  const [powerOneLevel, setPowerOneLevel] = React.useState(power_one_level);
  const [powerTwoLevel, setPowerTwoLevel] = React.useState(power_two_level);
  const [powerThreeLevel, setPowerThreeLevel] = React.useState(
    power_three_level
  );
  // handle change function takes in event and setState function

  const powerLevels = [0, 1, 2, 3, 4, 5];
  const charLevels = [...Array(400).keys()];
  function handleChange(e) {
    e.preventDefault();
    // React.setFunc(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div key={id}>
      <p>{name}</p>
      <label>Character Level</label>
      <select onChange={handleChange} value={charLevel}>
        {charLevels.map((level) => {
          return <option key={level}>{level}</option>;
        })}
      </select>
      <div className="power-select">
        <label>Power One </label>
        <select onChange={handleChange} value={powerOneLevel}>
          {powerLevels.map((level) => {
            return <option key={level}>{level}</option>;
          })}
        </select>
        <label>Power Two </label>
        <select onChange={handleChange} value={powerTwoLevel}>
          {powerLevels.map((level) => {
            return <option key={level}>{level}</option>;
          })}
        </select>
        <label>Power Three </label>
        <select onChange={handleChange} value={powerThreeLevel}>
          {powerLevels.map((level) => {
            return <option key={level}>{level}</option>;
          })}
        </select>
      </div>
      <UpdateCharacter
        props={
          (id,
          {
            char_level: charLevel,
            power_one_level: powerOneLevel,
            power_two_level: powerTwoLevel,
            power_three_level: powerThreeLevel,
          })
        }
      />
    </div>
  );
};

export default Card;
