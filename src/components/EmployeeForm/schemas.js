import * as yup from 'yup';
import validationSchemaLocale from '../../utils/validationSchemaLocale';

yup.setLocale(validationSchemaLocale);

const defaultValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  jobPosition: null,
  dateBirth: null,
  gender: 'male',
  dateStart: null,
  dateEnd: null,
  permissions: false,
};

const validationSchema = yup.object().shape({
  lastName: yup.string().required(),
  firstName: yup.string().required(),
  middleName: yup.string(),
  jobPosition: yup.object().nullable().required(),
  dateBirth: yup.date().nullable().required(),
  gender: yup.string().required(),
  dateStart: yup.date()
    .nullable()
    .when('dateEnd', {
      is: (dateEnd) => dateEnd || dateEnd === 0,
      then: yup.date().nullable().max(yup.ref('dateEnd')),
    }).required(),
  dateEnd: yup.date()
    .nullable()
    .when('dateStart', {
      is: (dateStart) => dateStart || dateStart === 0,
      then: yup.date().nullable().min(yup.ref('dateStart')),
    }).required(),
  permissions: yup.boolean(),
}, ['dateStart', 'dateEnd']);

export { defaultValues, validationSchema }
