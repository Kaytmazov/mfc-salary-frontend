import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const SubmitBtn = ({ isSubmitting, text, ...props }) => (
  <Button type="submit" disabled={isSubmitting} {...props}>
    {isSubmitting ? (
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    ) : (
      text
    )}
  </Button>
);

SubmitBtn.defaultProps = {
  text: 'Добавить',
};

SubmitBtn.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default SubmitBtn;
