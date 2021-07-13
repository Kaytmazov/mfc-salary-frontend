import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className, width, height }) => {
  const classNames = className ? `icon ${className}` : 'icon';

  return (
    <svg className={classNames} width={width} height={height}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

Icon.defaultProps = {
  className: null,
  width: null,
  height: null,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Icon;
