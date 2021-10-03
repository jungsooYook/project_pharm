const EditPharmData = (data, startMark, endMark) => {
  const endIndex = data.lastIndexOf(startMark);
  var dataEdited = ``;
  var index = 0;

  while (index != -1) {
    var startMarkLength = startMark.length;
    var startIndex = data.indexOf(startMark, index);
    var nextIndex = data.indexOf(startMark, startIndex + 1);
    var endMarkIndex = data.indexOf(endMark, startIndex + startMarkLength);

    dataEdited += data.substring(startIndex + startMarkLength, endMarkIndex);
    index = nextIndex;
  }
  return dataEdited;
};

export default EditPharmData;
