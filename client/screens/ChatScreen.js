import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dataTitle}>{data}</Text>
      <Pressable style={styles.button} onPress={() => console.log('Test')}>
        {
          isLoading
            ? <ActivityIndicator size="large" style={styles.spin}/>
            : <Text style={styles.text}>Получить статус</Text>
        }
      </Pressable>
      <StatusBar style="auto" />
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
  button: {
    width: '80%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#AF4766',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  spin: {
    color: 'white',
  }
});
