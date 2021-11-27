import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? styles.wrapperPressIn : styles.wrapperPressOut,
        styles.wrapper
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 5,
    shadowColor: "#3d3535",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
    elevation: 12,
  },
  wrapperPressOut: {
    backgroundColor: "#5D7CF3",
    shadowOpacity: 0.25,
  },
  wrapperPressIn: {
    backgroundColor: "#0b1f70",
    shadowOpacity: 0.6,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 0.25,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  title: 'Button',
  onPress: () => {},
};

export default Button;
