import React from 'react';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';

import store from './redux/store';

import { screens } from './utils/constants'

import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {

  const Drawer = createDrawerNavigator();

  const loginScreenOptions = {
    header: () => null,
    swipeEnabled: false,
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={screens.LOGIN}
          drawerContent={ (props) => <Sidebar {...props} /> }
          screenOptions={ { header: () => <AppHeader/> } }
        >
          <Drawer.Screen name={screens.LOGIN} component={LoginScreen} options={loginScreenOptions} />
          <Drawer.Screen name={screens.CHAT} component={ChatScreen} />
          <Drawer.Screen name={screens.SETTINGS} component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

