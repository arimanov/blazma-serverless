import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.messagesWrapper}>
        {
          [...Array(30)].map((i, k) =>
              <Text key={k} style={{ fontSize: 25, backgroundColor: 'red', padding: 10, marginTop: 20 }}>Ты пидр!</Text>)
        }

      </ScrollView>
      <View>
        <Text>Send Button and input</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DDE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    marginBottom: 10,
  },
  messagesWrapper: {
    width: '100%',
  }
});
