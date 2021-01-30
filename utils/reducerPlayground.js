// initialState will be populated by the requisite values from the API call
const initialState = {
  powerOneLevelLevel: power_one_level,
  powerTwoLevelLevel: power_two_level,
  powerThreeLevelLevel: power_three_level,
  totalLevels: powerOneLevelLevel + powerTwoLevelLevel + powerThreeLevelLevel,
  maxLevel: totalLevels,
};

function reducer(state, action) {
  switch (action.type) {
    case 'one':
      return { count: state.count + 1 };
    case 'two':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Destructure state object fields here
  return (
    <>
      Total Levels: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
