import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';

import { Input } from '../shared/Input';
import SubmitBtn from '../shared/SubmitBtn';

import { useAuth } from '../../context/auth-context';
import getErrorText from '../../utils/getErrorText';

import logo from '../../assets/logo.svg';

import './LoginForm.scss';

const validationSchema = yup.object({
  login: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const history = useHistory();
  const { login } = useAuth();
  const methods = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    login(values)
      .then(() => history.push('/'))
      .catch((error) => {
        const errorText = getErrorText(error);
        toast.error(errorText);
      });
  };

  return (
    <div className="login-form">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <img className="logo" src={logo} width="252" height="70" alt="Логотип" />
          <Input name="login" label="Логин" />
          <Input name="password" label="Пароль" type="password" />

          <SubmitBtn variant="dark" isSubmitting={false} text="Войти" block />
        </Form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
