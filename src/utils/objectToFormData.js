import formatISO from 'date-fns/formatISO';
import { isObject, isArray, isDateField, isFileField, isSelectField } from './checkTypesMap';

const objectToFormData = (values, formData = new FormData(), namespace) => {
  Object.entries(values).forEach(([key, value]) => {
    const formKey = namespace ? `${namespace}.${key}` : key;

    if (value || value === 0) {
      if (isDateField(value)) {
        formData.set(formKey, formatISO(value));
      } else if (isObject(value)) {
        if (isSelectField(value)) {
          formData.set(formKey, value.value);
        } else if (isFileField(value)) {
          formData.set(formKey, value);
        } else {
          objectToFormData(value, formData, formKey);
        }
      } else if (isArray(value)) {
        value.forEach(({ id }, idx) => formData.set(`${formKey}[${idx}]`, id));
      } else {
        formData.set(formKey, value);
      }
    }
  });

  return formData;
};

export default objectToFormData;
