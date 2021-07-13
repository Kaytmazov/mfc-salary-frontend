const extractFieldValue = (field) => {
  if (!field) {
    return '';
  }

  switch (typeof field) {
    case 'string':
      return field.toLowerCase();

    case 'object':
      return field.value.toLowerCase();

    default:
      return field;
  }
};

export default extractFieldValue;
