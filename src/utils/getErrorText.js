import { isString, isObject } from './checkTypesMap';

const getErrorText = (error) => {
  if (error.response) {
    const { data, status, statusText } = error.response;

    if (data && isString(data)) {
      return data;
    }

    if (isObject(data) && data.errors && isObject(data.errors)) {
      return Object.values(data.errors)[0];
    }

    return `Ошибка ${status}. ${statusText}`;
  }

  return error.message;
};

export default getErrorText;
