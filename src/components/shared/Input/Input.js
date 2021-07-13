import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext, get } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
// import MaskedInput from 'react-text-mask';

// import inputMasksMap from '../../../utils/inputMasksMap';

const Input = React.memo(
  ({ name, label, type, as, mask, isDisabled, size, onFocusOut, ...rest }) => {
    const {
      register,
      control,
      formState: { errors },
    } = useFormContext();

    const errorMsg = get(errors, name)?.message;
    const isInvalid = Boolean(errorMsg);

    return (
      <Form.Group className="input-wrapper" controlId={name} {...size}>
        {label && <Form.Label>{label}</Form.Label>}
        {mask ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              // временно
              // <MaskedInput
              //   {...field}
              //   className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
              //   type={type}
              //   disabled={isDisabled}
              //   autoComplete="off"
              //   mask={inputMasksMap[mask]}
              //   guide={false}
              //   {...rest}
              // />
              <Form.Control
                {...register(name)}
                type={type}
                as={as}
                isInvalid={isInvalid}
                disabled={isDisabled}
                autoComplete="off"
                {...rest}
              />
            )}
          />
        ) : (
          <Form.Control
            {...register(name)}
            type={type}
            as={as}
            isInvalid={isInvalid}
            disabled={isDisabled}
            autoComplete="off"
            {...rest}
          />
        )}
        <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
          {errorMsg}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
);

Input.defaultProps = {
  label: undefined,
  type: 'text',
  as: undefined,
  isDisabled: false,
  mask: undefined,
  size: undefined,
  onFocusOut: undefined,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  as: PropTypes.string,
  isDisabled: PropTypes.bool,
  mask: PropTypes.string,
  onFocusOut: PropTypes.func,
  size: PropTypes.shape({
    as: PropTypes.shape().isRequired,
  }),
};

export default Input;
