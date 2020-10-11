
/**
 * https://egghead.io/lessons/react-redux-implementing-combinereducers-from-scratch
 */
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};

module.exports = combineReducers;