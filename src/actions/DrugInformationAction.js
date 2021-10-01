export const DrugInformationAction = (
  name,
  howToStore,
  howMuch,
  mainIngredient
) => ({
  type: "DRUGINFORMATIONACTION",
  name,
  howToStore,
  howMuch,
  mainIngredient,
});
