export const AddDrugInfo = drugInfo => {
  return {
    type: 'ADD_DRUGINFO',
    drugInfo: {
      id: drugInfo.id,
      name: drugInfo.name,
      howToStore: drugInfo.howToStore,
      howMuch: drugInfo.howMuch,
      effect: drugInfo.effect,
      mainINGR: drugInfo.mainINGR,
      time: drugInfo.time,
      barcode: drugInfo.barcode,
      seqcode: drugInfo.seqcode,
      StdCode: drugInfo.StdCode,
      ATCcode: drugInfo.ATCcode,
      caution: drugInfo.caution,
      brandName: drugInfo.brandName,
      updateInfo: drugInfo.updateInfo,
      PregnantGrade: drugInfo.PregnantGrade,
      PregnantNote: drugInfo.PregnantNote,
      ElderNote: drugInfo.ElderNote,
      ChildAge: drugInfo.ChildAge,
      ChildRange: drugInfo.ChildRange,
      ChildNote: drugInfo.ChildNote,
      MaxInjectDay: drugInfo.MaxInjectDay,
      MaxDayCapacity: drugInfo.MaxDayCapacity,
      CombTarget: drugInfo.CombTarget,
      CombNote: drugInfo.CombNote,
      CombCount: drugInfo.CombCount,
      EffectGroup: drugInfo.EffectGroup,
      EffectTarget: drugInfo.EffectTarget,
      DuplicationCount: drugInfo.DuplicationCount,
      INGRCode: drugInfo.INGRCode,
    },
  };
};

export const RemoveDrugInfo = id => {
  return {
    type: 'REMOVE_DRUGINFO',
    id,
  };
};

// 8806456009336
