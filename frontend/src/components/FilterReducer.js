function FilterReducer(state, { type, payload }) {
  console.log(payload);
  switch (type) {
    case "INITIALIZE":
      return payload;
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          [payload.key2]: state[payload.key][payload.key2] ? false : true,
        },
      };

    case "SET_RANGE_TOTAL":
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          lowerBound: payload.value[0],
          upperBound: payload.value[1],
        },
      };

    case "SET_RANGE_DATE":
      const newState = {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          [payload.key2]: payload.value,
        },
      };
      return newState["transactionDate"]["lowerBound"] >
        newState["transactionDate"]["upperBound"]
        ? {
            ...state,
            [payload.key]: {
              ...state[payload.key],
              [payload.key2]: payload.value,
            },
          }
        : newState;
    default:
      return state;
  }
}

export default FilterReducer;
