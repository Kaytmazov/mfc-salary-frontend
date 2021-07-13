import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext, get } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import ReactSelect from 'react-select';

import { isObject } from '../../../../utils/checkTypesMap';

import './Select.scss';

const transformSelectData = (data) => {
  if (!data.length) {
    return data;
  }

  return data.map((it) => {
    // Проверяем переданный массив это объекты с IDшниками и наименованиями или одномерный
    return isObject(it)
      ? {
          value: it.id,
          label: it.name,
        }
      : {
          value: it,
          label: it,
        };
  });
};

const Select = React.memo(({ name, data, label, size, ...rest }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMsg = get(errors, name)?.message;
  const isInvalid = Boolean(errorMsg);

  return (
    <Form.Group className="input-wrapper" controlId={name} {...size}>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            className={`react-select-container ${isInvalid ? 'is-invalid' : ''}`}
            classNamePrefix="react-select"
            options={transformSelectData(data)}
            placeholder="Выберите из списка..."
            isClearable
            {...rest}
          />
        )}
      />
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {errorMsg}
      </Form.Control.Feedback>
    </Form.Group>
  );
});

Select.defaultProps = {
  data: [],
  size: undefined,
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
        name: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ])
  ),
  label: PropTypes.string.isRequired,
  size: PropTypes.shape({
    as: PropTypes.shape().isRequired,
  }),
};

export default Select;
