import updateArray from './updateArray';

const updateDocuments = (documents, payload) => {
  const docIdx = documents.findIndex(({ id }) => id === payload.documentId);

  const updatedDoc = {
    ...documents[docIdx],
    files: updateArray(documents[docIdx].files, payload.file),
  };

  return updateArray(documents, updatedDoc);
};

export default updateDocuments;
