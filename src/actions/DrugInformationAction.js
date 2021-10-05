export const AddDrugInfo = (drugInfo) => {
  return {
    type: "ADD_DRUGINFO",
    drugInfo: {
      id: drugInfo.id,
      name: drugInfo.name,
      howToStore: drugInfo.howToStore,
      howMuch: drugInfo.howMuch,
      mainINGR: drugInfo.mainINGR,
      time: drugInfo.time,
      barcode: drugInfo.barcode,
      seqcode: drugInfo.seqcode,
      stdcode: drugInfo.stdcode
    },
  };
};

export const RemoveDrugInfo = (id) => {
  return {
    type: "REMOVE_DRUGINFO",
    id,
  };
};
