import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

import getErrorText from '../../../utils/getErrorText';

const ErrorIndicator = ({ error }) => {
  return <Alert variant="danger">{getErrorText(error)}</Alert>;
};

ErrorIndicator.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorIndicator;
