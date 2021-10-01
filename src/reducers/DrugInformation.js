function DrungInfomation(state = initialState, action) {
  const DRUGINFORMATIONACTION = "DRUGINFORMATIONACTION";

  switch (action.type) {
    case DRUGINFORMATIONACTION:
      return {
        ...state,
        name: action.name,
        howToStore: action.howToStore,
        howMuch: action.howMuch,
        mainIngredient: action.mainIngredient,
        time: action.time,
      };
    default:
      return state;
  }
}

const initialState = {
  name: "",
  howToStore: "",
  howMuch: "",
  mainIngredient: "",
  time: "",
};
export { DrungInfomation, initialState };
