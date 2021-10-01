export const DrugInformationAction = (
  name,
  howToStore,
  howMuch,
  mainIngredient,
  time
) => ({
  type: "DRUGINFORMATIONACTION",
  name,
  howToStore,
  howMuch,
  mainIngredient,
  time,
});
