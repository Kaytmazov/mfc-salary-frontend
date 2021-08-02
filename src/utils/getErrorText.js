// import { isString, isObject } from './checkTypesMap';

const getErrorText = (error) => {
  // Временно
  return error?.response?.errors[0]?.message || error.message;
};

export default getErrorText;
