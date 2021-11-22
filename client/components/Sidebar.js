import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';

import { screens } from '../utils/constants';

export default ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '90%', backgroundColor: '#beb5b5', paddingTop: 30 }}>
        <Button onPress={() => navigation.navigate(screens.CHAT.name)} title="✉ Chat" />
        <Button onPress={() => navigation.navigate(screens.SETTINGS.name)} title="🛠 Settings" />
      </View>
    </SafeAreaView>
  );
}
