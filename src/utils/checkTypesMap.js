const isString = (item) => typeof item === 'string';
const isDateField = (field) => field instanceof Date;
const isFileField = (field) => field instanceof File;
const isArray = (field) => field instanceof Array;
const isObject = (field) => field !== null && !isArray(field) && typeof field === 'object';
const isSelectField = (field) => Object.prototype.hasOwnProperty.call(field, 'label');

export { isString, isDateField, isFileField, isArray, isObject, isSelectField };
