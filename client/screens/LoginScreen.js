import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { LOGIN_REQUEST } from '../redux/reducers';

import { useDispatch, useSelector } from 'react-redux';

import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  View,
  ActivityIndicator
} from 'react-native';

import MyButton from '../components/Button';

import { authUser } from '../redux/reducers';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.requestStatuses.errorLoginRequest);
  const isLoading = useSelector((state) => state.requestStatuses.isActiveLoginRequest);

  const [loginValue, setLoginValue] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <TextInput
          editable={true}
          style={styles.input}
          placeholder="Your name"
          keyboardType="email-address"
          onChangeText={setLoginValue}
        />
        <View style={styles.buttonBlock}>
          {
            isLoading
              ? <ActivityIndicator size="large" style={styles.spin} />
              : <MyButton
                  onPress={() => {
                  dispatch(authUser(loginValue));
                  //navigation.navigate(screens.CHAT.name);
                  }}
                  title={'Join to chat'}
                />
          }

          <Text style={{ marginTop: 20 }}>Ошибка: {errorMessage}</Text>
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
    justifyContent: 'center',
  },
  input: {
    width: '60%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#5D7CF3',
  },
  buttonBlock: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
  },
  spin: {
    marginTop: 10,
  }
});
