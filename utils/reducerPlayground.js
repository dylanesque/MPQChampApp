// initialState will be populated by the requisite values from the API call
const initialState = {
  powerOneLevel: power_one_level,
  powerTwoLevel: power_two_level,
  powerThreeLevel: power_three_level,
  totalLevels: powerOneLevel + powerTwoLevel + powerThreeLevel,
  maxLevel: totalLevels
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
  return (
    <>
      Total Levels: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
