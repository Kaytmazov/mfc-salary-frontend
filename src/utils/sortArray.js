import extractFieldValue from './extractFieldValue';

const sortArray = (array, field) => {
  return [...array].sort((a, b) => {
    const nameA = extractFieldValue(a[field]);
    const nameB = extractFieldValue(b[field]);

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
  });
};

export default sortArray;
