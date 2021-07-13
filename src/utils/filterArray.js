import extractFieldValue from './extractFieldValue';

const filterArray = (array, filterValues) => {
  const filterBySearch = (item) => {
    const { searchValue, searchBy } = filterValues;

    if (!searchValue) {
      return true;
    }

    const keyword = searchValue.toLowerCase();

    return searchBy.some((it) => {
      const value = extractFieldValue(item[it]);
      return value.indexOf(keyword) > -1;
    });
  };

  const filters = [filterBySearch];

  Object.entries(filterValues).forEach(([key, values]) => {
    if (key !== 'searchValue' && key !== 'searchBy') {
      filters.push((item) => {
        if (!values.length) {
          return true;
        }

        return values.some(({ id }) => id === item[key]);
      });
    }
  });

  return filters.reduce((arr, func) => {
    return arr.filter(func);
  }, array);
};

export default filterArray;
