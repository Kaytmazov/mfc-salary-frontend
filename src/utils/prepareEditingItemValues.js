// временно
// const prepareEditingItemValues = (data, initialValues) => {
//   const values = {
//     id: data.id,
//   };

//   Object.keys(initialValues).forEach((key) => {
//     if (data[key] !== null) {
//       values[key] = data[key];
//     }
//   });

//   return values;
// };

// export default prepareEditingItemValues;

import { isObject } from './checkTypesMap';

const prepareEditingItemValues = (data, initialValues) => {
  const values = {};

  Object.keys(initialValues).forEach((key) => {
    if (data[key] === null || data[key] === undefined) {
      values[key] = initialValues[key];
    } else if (isObject(data[key])) {
      values[key] = prepareEditingItemValues(data[key], initialValues[key]);
    } else {
      values[key] = data[key];
    }
  });

  return values;
};

export default prepareEditingItemValues;
