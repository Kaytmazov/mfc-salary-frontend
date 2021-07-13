import React from 'react';
import PropTypes from 'prop-types';

import { useFormContext, get } from 'react-hook-form';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';

import './CheckField.scss';

const CheckField = React.memo(
  ({ name, id, value, label, type, className, isDisabled, ...rest }) => {
    const {
      register,
      formState: { errors },
      watch,
    } = useFormContext();

    const errorMsg = get(errors, name)?.message;
    const fieldValue = watch(name);

    let classNames = 'check-field';

    if (className) {
      classNames += ` ${className}`;
    }

    if (errorMsg) {
      classNames += ' invalid';
    }

    return (
      <div className={classNames}>
        <input
          className={type}
          type={type === 'radio' ? 'radio' : 'checkbox'}
          id={id}
          value={value}
          defaultChecked={fieldValue === value}
          disabled={isDisabled}
          {...rest}
          {...register(name)}
        />
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <Feedback className="invalid-tooltip" type="invalidd">
          {errorMsg}
        </Feedback>
      </div>
    );
  }
);

CheckField.defaultProps = {
  label: undefined,
  value: undefined,
  type: 'checkbox',
  isDisabled: false,
  className: undefined,
};

CheckField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  label: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default CheckField;
