function DarkMode(state = initialState, action) {
  const DARKMODE = "DARKMODE";

  switch (action.type) {
    case DARKMODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };
    default:
      return state;
  }
}

const initialState = {
  darkmode: false,
};
export { DarkMode, initialState };
