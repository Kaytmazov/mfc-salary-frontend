import PropTypes from 'prop-types';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Input, Select, DatePicker, CheckField } from '../shared/Input';
import Icon from '../shared/Icon';

import { validationSchema } from '../EmployeeForm/schemas';

const jobPositions = ['Оператор', 'Юрист', 'Администратор'];

const EmployeeForm = ({ defaultValues, onSubmit }) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [dateStartValue, dateEndValue] = methods.watch(['dateStart', 'dateEnd']);

  return (
    <FormProvider {...methods}>
      <Form id="employee-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <fieldset className="mb-4">
          <legend>Основные данные</legend>
          <Row>
            <Col lg={{ span: 10, offset: 1 }}>
              <Form.Row>
                <Input name="lastName" label="Фамилия" size={{ as: Col }} />
                <Input name="firstName" label="Имя" size={{ as: Col }} />
                <Input name="middleName" label="Отчество" size={{ as: Col }} />
              </Form.Row>
              <Form.Row>
                <DatePicker
                  name="dateBirth"
                  label="Дата рождения"
                  size={{ as: Col, sm: 6, md: 4 }}
                />
                <Form.Group as={Col} style={{ paddingTop: 34, paddingLeft: 34 }}>
                  <CheckField
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    label={
                      <>
                        <Icon name="gender-male" width="17px" height="30px" />
                        Мужской
                      </>
                    }
                  />
                  <CheckField
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    label={
                      <>
                        <Icon name="gender-female" width="17px" height="30px" />
                        Женский
                      </>
                    }
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
        </fieldset>
        <fieldset className="mb-4">
          <legend>Дополнительные данные</legend>
          <Row>
            <Col lg={{ span: 10, offset: 1 }}>
              <Select name="jobPosition" label="Должность" data={jobPositions} />
              <Form.Row>
                <DatePicker
                  name="dateStart"
                  label="Дата приема на работу"
                  selectsStart
                  startDate={dateStartValue}
                  endDate={dateEndValue}
                  size={{ as: Col }}
                />
                <DatePicker
                  name="dateEnd"
                  label="Дата увольнения"
                  selectsEnd
                  startDate={dateStartValue}
                  endDate={dateEndValue}
                  minDate={dateStartValue}
                  size={{ as: Col }}
                />
                <Form.Group as={Col} md="auto" style={{ paddingTop: 38, paddingLeft: 30 }}>
                  <CheckField
                    name="permissions"
                    id="permissions"
                    label="Наличие прав"
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </FormProvider>
  );
};

EmployeeForm.propTypes = {
  defaultValues: PropTypes.shape({
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    jobPosition: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
    dateBirth: PropTypes.instanceOf(Date),
    gender: PropTypes.string,
    dateStart: PropTypes.instanceOf(Date),
    dateEnd: PropTypes.instanceOf(Date),
    permissions: PropTypes.bool,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EmployeeForm;
