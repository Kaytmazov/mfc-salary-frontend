const getFileNameAndExt = (fileName) => ({
  name: fileName.substr(0, fileName.lastIndexOf('.')),
  extension: fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length),
});

export default getFileNameAndExt;
