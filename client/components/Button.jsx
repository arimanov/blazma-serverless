import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const Button = ({ onPress, title, loading }) => {
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
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
    backgroundColor: "#375cec",
    shadowOpacity: 0.6,
  },
  text: {
    letterSpacing: 0.25,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  }
});

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  title: 'Button',
  loading: false,
  onPress: () => {},
};

export default Button;
