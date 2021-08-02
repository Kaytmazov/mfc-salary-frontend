import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext, get } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import ReactSelect from 'react-select';

import { isObject } from '../../../../utils/checkTypesMap';

import './Select.scss';

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
        render={({ field }) => {
          let value = field.value;

          if (field.value || field.value === 0) {
            const isFlatOptionsArr = data.length && !isObject(data[0]);

            value = isFlatOptionsArr
              ? {
                  id: field.value,
                  name: field.value,
                }
              : data.find((it) => it.id === field.value);
          }

          return (
            <ReactSelect
              {...field}
              value={value}
              onChange={(val) => {
                return field.onChange(!val ? null : isObject(val) ? val.id : val);
              }}
              className={`react-select-container ${isInvalid ? 'is-invalid' : ''}`}
              classNamePrefix="react-select"
              getOptionValue={(option) => option.id ?? option}
              getOptionLabel={(option) => option.name ?? option}
              options={data}
              placeholder="Выберите из списка..."
              isClearable
              {...rest}
            />
          );
        }}
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
      PropTypes.number,
    ])
  ),
  label: PropTypes.string.isRequired,
  size: PropTypes.shape({
    as: PropTypes.shape().isRequired,
  }),
};

export default Select;
