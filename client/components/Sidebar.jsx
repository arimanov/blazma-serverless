import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


import { screens } from '../utils/constants';
import SidebarButton from './SidebarButton';
import { logoutStatusSelector, logoutUserAction, userDataSelector } from '../redux/reducers';

const Sidebar = ({ navigation }) => {

  const dispatch = useDispatch();

  const [activeScreenIndex, setActiveScreenIndex] = useState(1);
  const { userName, userToken } = useSelector(userDataSelector);
  const isLoadingLogout = useSelector(logoutStatusSelector);

  useEffect(() => {
    if (!userName && !userToken) {
      navigation.navigate(screens.LOGIN);
    }
  }, [userName, userToken]);

  useEffect(() => {
    setActiveScreenIndex(navigation.getState().index);
  }, [navigation.getState().index]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F8FA' }}>

      <View style={styles.userInfo}>
        <Ionicons name="person-circle-outline" size={70} color={'#5D7CF3'}/>
        <Text style={{ color: '#5D7CF3', fontWeight: 'bold' }}>{userName}</Text>
      </View>

      <View style={{ paddingTop: 30, flex: 1 }}>
        <SidebarButton
            icon="chatbubble-ellipses-outline"
            text="Messages"
            navigateTo={screens.CHAT}
            active={activeScreenIndex === 1}
        />
        <SidebarButton
            icon="settings-outline"
            text="Settings"
            navigateTo={screens.SETTINGS}
            active={activeScreenIndex === 2}
        />
        <SidebarButton
            icon="information-circle-outline"
            text="Info"
            navigateTo={screens.INFO}
            active={activeScreenIndex === 3}
        />
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
                <Ionicons name="exit-outline" size={30} color={'#fff'} style={{ marginLeft: 23 }}/>
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
    width: 70,
    height: 70,
    justifyContent: 'center',
    borderRadius: 100,
  },
  logoutButtonPressIn: {
    backgroundColor: '#F9D8D9',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonPressOut: {
    backgroundColor: '#EA7E7F',
  },
  userInfo: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
  },
  spin: {
    marginTop: 18
  },
});

export default Sidebar;
