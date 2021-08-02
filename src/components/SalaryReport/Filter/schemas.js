import * as yup from 'yup';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';

yup.setLocale(validationSchemaLocale);

const validationSchema = yup.object().shape({
  officeId: yup.string().nullable().required(),
  month: yup.number().nullable().required(),
  year: yup.number().nullable().required(),
});

export { validationSchema };
