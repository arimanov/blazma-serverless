import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


import { screens } from '../utils/constants';

import { logoutStatusSelector, logoutUserAction, userDataSelector } from '../redux/reducers';

const Sidebar = ({ navigation }) => {

  const dispatch = useDispatch();

  const { userName, userToken } = useSelector(userDataSelector);
  const isLoadingLogout = useSelector(logoutStatusSelector);

  useEffect(() => {
    if (!userName && !userToken) {
      navigation.navigate(screens.LOGIN);
    }
  }, [userName, userToken]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '90%', backgroundColor: '#beb5b5', paddingTop: 30 }}>
        <Button onPress={() => navigation.navigate(screens.CHAT)} title="✉ Chat" />
        <Button onPress={() => navigation.navigate(screens.SETTINGS)} title="🛠 Settings" />
      </View>
      <View style={styles.bottom}>
        {
          isLoadingLogout
            ? <ActivityIndicator size="large" style={styles.spin} />
            : <Pressable
                style={({ pressed }) => [
                  pressed ? styles.logoutButtonPressIn : styles.logoutButtonPressOut,
                  styles.logoutButton
                ]}
                onPress={() => dispatch(logoutUserAction())}
              >
                <Ionicons name="exit-outline" size={30} color={'#fff'}/>
              </Pressable>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  logoutButton: {
    padding: 15,
    paddingLeft: 20,
    borderRadius: 100,
  },
  logoutButtonPressIn: {
    backgroundColor: 'blue',
  },
  logoutButtonPressOut: {
    backgroundColor: 'red',
  }
});

export default Sidebar;
