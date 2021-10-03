const getFileTypeFromPresSignedUrl = (url) => {
  console.log(url, "uurrl");
  let tempArray;
  if (url) {
    tempArray = url?.split("?");
    tempArray = tempArray[0]?.split(".");
    let fileType = tempArray[tempArray?.length - 1];
    return fileType;
  } else {
    return undefined;
  }
};

export { getFileTypeFromPresSignedUrl };
