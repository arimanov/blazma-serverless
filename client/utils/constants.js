import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";

export const screens = {
  CHAT: { name: 'ChatScreen', component: ChatScreen } ,
  SETTINGS: { name: 'SettingsScreen', component: SettingsScreen } ,
  LOGIN: { name: 'LoginScreen', component: LoginScreen } ,
}
