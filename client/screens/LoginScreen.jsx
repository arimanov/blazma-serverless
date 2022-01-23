import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';

import Button from '../components/Button';
import NotificationCard from '../components/NotificationCard';
import Input from '../components/Input';
import {
  loginErrorSelector,
  authUserAction,
  loginStatusSelector,
  clearLoginErrorAction,
  //connectionStatusSelector,
  userDataSelector,
  statusRequestSelector,
} from '../redux/reducers';
import { screens } from '../utils/constants';
import useAuthData from '../hooks/useAuthData';


export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errorMessage = useSelector(loginErrorSelector);
  const isLoading = useSelector(loginStatusSelector);
  const isLoadingStatus = useSelector(statusRequestSelector);
  //const connectionStatus = useSelector(connectionStatusSelector);
  const { userName, userToken } = useSelector(userDataSelector);
  const { setUserData } = useAuthData();

  const [loginValue, setLoginValue] = useState('');

  useEffect(() => {
    if (userName && userToken) {
      setUserData({ userName, userToken });
      navigation.navigate(screens.CHAT);
    }
  }, [userName, userToken]);

  const onPressSubmit = () => {
    Keyboard.dismiss();
    dispatch(authUserAction(loginValue));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {
          isLoadingStatus ? <View style={styles.loadView}><ActivityIndicator size="large" /></View> : null
        }
        <Image
          style={styles.logo}
          source={require('../assets/blazma-logo.png')}
        />
        <View style={styles.formBlock}>
          <Input editable={!isLoading} onChange={setLoginValue} placeholder="Your name" />
          {
            isLoading
              ? <ActivityIndicator size="large" style={styles.spin} />
              : <Button onPress={onPressSubmit} title={'Join to chat'} />
          }
          <View style={styles.separator}/>
          {
            errorMessage
              ? <NotificationCard text={errorMessage} onClose={() => dispatch(clearLoginErrorAction())} />
              : null
          }
        </View>
        <View style={styles.bottom}>
          <Text style={styles.secondText}>
            <Ionicons name="git-branch-outline" size={16} style={styles.secondText} />
            App version: 0.1
          </Text>
          {/*<Text style={styles.secondText}>Server status: { connectionStatus ? '🟢' : '🔴' }</Text>*/}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  logo: {
    marginTop: 50,
    height: 200,
    width: 200,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    color: '#fff',
  },
  formBlock: {
    flex: 1,
    width: '70%',
    height: '30%',
    paddingTop: 60,
  },
  separator: {
    height: 40,
  },
  spin: {
    marginTop: 10,
  },
  secondText: {
    color: '#4d4d4d'
  }
});
