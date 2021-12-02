import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const NotificationCard = ({text, type, onClose}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <View style={styles.bodyIcon}>
          <Ionicons name="alert-circle-outline" size={30} color={'red'} />
        </View>
        <View style={styles.bodyText}>
          <Text>{text}</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          pressed ? styles.bottomPressIn : styles.bottomPressOut,
          styles.bottom
        ]}
        onPress={onClose}
      >
        <Ionicons
          name="close-outline"
          size={30}
          color={'#886767'}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F9D8D9',
    borderRadius: 10,
  },
  body: {
    paddingBottom: 10,
    paddingTop: 5,
    flexDirection: 'row',
  },
  bodyText: {
    width: '85%',
    paddingTop: 10,
    paddingRight: 10
  },
  bodyIcon: {
    width: '15%',
    margin: 10,
  },
  bottom: {
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#bd9a9b',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bottomPressIn: {
    backgroundColor: '#d3b2b3',
  },
  bottomPressOut: {
    backgroundColor: '#dcc2c3',
  }
});

NotificationCard.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['error']),
};

NotificationCard.defaultProps = {
  text: '',
  onClose: () => {},
  type: 'error'
};

export default NotificationCard;
