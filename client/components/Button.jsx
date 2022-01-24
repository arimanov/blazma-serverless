import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../utils/appColors';

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
    backgroundColor: colors.blueSecond,
    shadowOpacity: 0.25,
  },
  wrapperPressIn: {
    backgroundColor: colors.blueGeneral,
    shadowOpacity: 0.6,
  },
  text: {
    letterSpacing: 0.25,
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.graySecond,
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
