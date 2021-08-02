import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Select } from '../../shared/Input';

import { validationSchema } from './schemas';

import { useOfficesQuery } from '../../../hooks/offices';

import generateArrayOfYears from '../../../utils/generateArrayOfYears';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const monthsOptions = months.map((it, idx) => ({
  id: idx + 1,
  name: it,
}));
const yearOptions = generateArrayOfYears();

const Filter = ({ defaultValues, onSubmit }) => {
  const offices = useOfficesQuery();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (offices.isError) {
      toast.error(offices.error.message);
    }
  }, [offices.isError, offices.error]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Form.Row>
          <Select
            name="officeId"
            label="МФЦ"
            data={offices.data}
            isLoading={offices.isLoading}
            isDisabled={offices.isError}
            isClearable={false}
            size={{ as: Col, sm: 7 }}
          />
          <Select
            name="month"
            label="Месяц"
            data={monthsOptions}
            isClearable={false}
            size={{ as: Col }}
          />
          <Select
            name="year"
            label="Год"
            data={yearOptions}
            isClearable={false}
            size={{ as: Col }}
          />
          <Form.Group as={Col} sm="auto" className="align-self-end">
            <Button variant="info" type="submit">
              Сформировать
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </FormProvider>
  );
};

Filter.propTypes = {
  defaultValues: PropTypes.shape({
    officeId: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Filter;
