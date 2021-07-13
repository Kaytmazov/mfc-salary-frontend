import * as yup from 'yup';

const createYupSchema = (schema, field) => {
  const newSchema = schema;
  const { id, validationType, validations = [] } = field;

  if (!yup[validationType]) {
    return newSchema;
  }

  let validator = yup[validationType]();

  if (validationType === 'date') {
    validator = validator.nullable();
  }

  Object.entries(validations).forEach(([key, value]) => {
    if ((value || value === 0) && validator[key]) {
      const param = key !== 'required' ? value : undefined;
      validator = validator[key](param);
    }
  });

  newSchema[id] = validator;

  return newSchema;
};

export default createYupSchema;
