import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/appColors';

const Input = ({ placeholder, onChange, editable }) => {
  return (
    <TextInput
      editable={editable}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: colors.blueSecond,
  }
});

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: 'Input',
  onChange: () => {},
  editable: true,
};

export default Input;
