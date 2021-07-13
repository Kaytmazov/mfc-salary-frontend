import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext, get } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
// import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

// import inputMasksMap from '../../../utils/inputMasksMap';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = React.memo(({ name, label, isDisabled, size, ...rest }) => {
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
          <ReactDatePicker
            {...field}
            wrapperClassName={isInvalid ? 'is-invalid' : ''}
            selected={field.value || null}
            dateFormat="dd.MM.yyyy"
            disabled={isDisabled}
            autoComplete="off"
            // customInput={
            //   <MaskedInput
            //     // временно
            //     className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            //     mask={inputMasksMap.date}
            //   />
            // }
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

DatePicker.defaultProps = {
  isDisabled: false,
  size: undefined,
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  size: PropTypes.shape({
    as: PropTypes.shape().isRequired,
  }),
};

export default DatePicker;
