import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

const ErrorIndicator = ({ error }) => {
  if (error.request) {
    console.error('error.request', error.request);
  }

  return <Alert variant="danger">{error.message}</Alert>;
};

ErrorIndicator.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorIndicator;
