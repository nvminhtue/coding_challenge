import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import get from 'lodash/get';

const Input = ({
  label, name, type, variant, size, fullWidth, disabled, required, readOnly, errorKey, formik: {
    values, submitCount, errors, setFieldValue, handleChange, handleBlur, setFieldTouched,
  }, ...rest
}) => {
  const error = !disabled && !!submitCount && (!!get(errors, name) || !!get(errors, errorKey));
  const value = get(values, name) || '';

  const handleOnBlur = (e) => {
    handleBlur(e);
    const savingValue = typeof value === 'string' ? value.trim() : '';
    if (!savingValue) setFieldTouched(name, false);
    return setFieldValue(name, value.trim());
  };

  return (
    <input
      {...{
        name,
        value,
        type,
        variant,
        size,
        fullWidth,
        error,
        disabled,
        readOnly,
        onChange: handleChange,
        onBlur: handleOnBlur,
      }}
      label={label && `${label} ${required ? '*' : ''}`}
      {...rest}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  formik: PropTypes.shape({
    values: PropTypes.object,
    submitCount: PropTypes.number,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    setFieldTouched: PropTypes.func,
  }),
  variant: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  errorKey: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  variant: 'outlined',
  size: 'small',
  fullWidth: true,
  disabled: false,
  readOnly: false,
  type: 'text',
  errorKey: '',
  label: null,
};

export default connect(Input);
