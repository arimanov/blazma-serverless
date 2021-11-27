import React from 'react';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';

import store from './redux/store';

import { screens } from './utils/constants'

export default function App() {

  const Drawer = createDrawerNavigator();

  const loginScreenOptions = {
    header: () => null,
    swipeEnabled: false,
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login" drawerContent={ props => Sidebar(props) } screenOptions={ { header: () => <AppHeader/> } }>
          <Drawer.Screen name={screens.LOGIN.name} component={screens.LOGIN.component} options={loginScreenOptions} />
          <Drawer.Screen name={screens.CHAT.name} component={screens.CHAT.component} />
          <Drawer.Screen name={screens.SETTINGS.name} component={screens.SETTINGS.component} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

