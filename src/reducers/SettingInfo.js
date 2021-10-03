function SettingInfo(state = initialState, action) {
  const DARKMODE = "DARKMODE";
  const SCANVIBRATION = "SCANVIBRATION";

  switch (action.type) {
    case DARKMODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };
    case SCANVIBRATION:
      return {
        ...state,
        vibration: !state.vibration,
      };
    default:
      return state;
  }
}

const initialState = {
  darkmode: true,
  vibration: true,
};
export { SettingInfo, initialState };
