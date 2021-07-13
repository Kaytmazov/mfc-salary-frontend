import convertDate from './convertDate';

const fieldTypesMap = {
  number: 'цифры',
  string: 'буквы',
  date: 'дату',
};

const validationSchemaLocale = {
  mixed: {
    required: 'Обязательное поле',
    notType: ({ type }) => `Поле может содержать только ${fieldTypesMap[type]}`,
  },
  string: {
    min: ({ min }) => `Поле должно содержать минимум ${min} символов`,
    max: ({ max }) => `Поле может содержать максимум ${max} символов`,
    email: 'Невалидный e-mail',
    url: 'Невалидный url',
  },
  number: {
    min: ({ min }) => `Значение поля должно быть не менее ${min}`,
    max: ({ max }) => `Значение поля должно быть не более ${max}`,
    positive: 'Значение поля не может быть отрицательным',
  },
  date: {
    min: ({ min }) => `Значение поля не можеть быть ранее ${convertDate(min)}`,
    max: ({ max }) => `Значение поля не может быть позднее ${convertDate(max)}`,
  },
};

export default validationSchemaLocale;
