function SettingInfo(state = initialState, action) {
  switch (action.type) {
    case "DARKMODE":
      return {
        ...state,
        darkmode: !state.darkmode,
      };

    case "SCANVIBRATION":
      return {
        ...state,
        vibration: !state.vibration,
      };

    case "BIGTEXTMODEACTION":
      return {
        ...state,
        bigTextMode: !state.bigTextMode,
      };

    default:
      return state;
  }
}

const initialState = {
  darkmode: false,
  vibration: true,
  bigTextMode: false,
};
export { SettingInfo, initialState };
